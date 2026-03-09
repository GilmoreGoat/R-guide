import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'gilmore-secret-key-123';

app.use(cors());
app.use(express.json());

// Security middleware to prevent access to sensitive files
app.use((req, res, next) => {
    const sensitivePaths = ['/database.sqlite', '/server.js', '/package.json', '/package-lock.json', '/.env'];
    if (sensitivePaths.includes(req.path)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Initialize SQLite database
const db = new sqlite3.Database(join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create tables
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            page_name TEXT NOT NULL,
            input_index INTEGER NOT NULL,
            input_value TEXT,
            output_value TEXT,
            input_class TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id, page_name, input_index)
        )`);
    }
});

// --- API Routes ---

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// --- API Routes ---

// Register User
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Username already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }

            const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({ message: 'User created successfully', token, username });
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

// Login User
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        try {
            const isMatch = await bcrypt.compare(password, row.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, { expiresIn: '7d' });
            res.status(200).json({ message: 'Login successful', token, username: row.username });
        } catch (err) {
             return res.status(500).json({ error: 'Server error' });
        }
    });
});

// Save Progress
app.post('/api/progress', authenticateToken, (req, res) => {
    const { username, pageName, inputIndex, inputValue, outputValue, inputClass } = req.body;

    if (!username || !pageName || inputIndex === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Prevent IDOR: Ensure user can only save their own progress
    if (req.user.username !== username) {
        return res.status(403).json({ error: 'Cannot save progress for another user' });
    }

    // First get the user ID
    db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userId = user.id;

        // Upsert progress
        db.run(`
            INSERT INTO progress (user_id, page_name, input_index, input_value, output_value, input_class)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, page_name, input_index) DO UPDATE SET
                input_value = excluded.input_value,
                output_value = excluded.output_value,
                input_class = excluded.input_class
        `, [userId, pageName, inputIndex, inputValue, outputValue, inputClass], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error while saving progress' });
            }
            res.status(200).json({ message: 'Progress saved' });
        });
    });
});

// Get Progress
app.get('/api/progress/:username/:pageName', authenticateToken, (req, res) => {
    const { username, pageName } = req.params;

    if (req.user.username !== username) {
        return res.status(403).json({ error: 'Cannot fetch progress for another user' });
    }

    db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });

        db.all(`SELECT input_index, input_value, output_value, input_class FROM progress WHERE user_id = ? AND page_name = ?`,
            [user.id, pageName], (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error fetching progress' });
            res.status(200).json({ progress: rows });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, db };
