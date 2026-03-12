import express from 'express';
import cors from 'cors';
import pg from 'pg';
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

// Initialize PostgreSQL database
const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost/gilmore_db',
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: true } : false
});

db.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the PostgreSQL database.');

    // Create tables
    client.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`, (err, result) => {
        if (err) {
            console.error('Error creating users table', err);
        }
    });

    client.query(`CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        page_name VARCHAR(255) NOT NULL,
        input_index INTEGER NOT NULL,
        input_value TEXT,
        output_value TEXT,
        input_class VARCHAR(255),
        UNIQUE(user_id, page_name, input_index)
    )`, (err, result) => {
        release();
        if (err) {
            console.error('Error creating progress table', err);
        }
    });
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

        db.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === '23505') { // UNIQUE constraint violation in PostgreSQL
                    return res.status(409).json({ error: 'Username already exists' });
                }
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            const newUserId = result.rows[0].id;
            const token = jwt.sign({ id: newUserId, username }, JWT_SECRET, { expiresIn: '7d' });
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

    db.query(`SELECT * FROM users WHERE username = $1`, [username], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const row = result.rows[0];
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
    db.query(`SELECT id FROM users WHERE username = $1`, [username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userId = user.id;

        // Upsert progress
        db.query(`
            INSERT INTO progress (user_id, page_name, input_index, input_value, output_value, input_class)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT(user_id, page_name, input_index) DO UPDATE SET
                input_value = EXCLUDED.input_value,
                output_value = EXCLUDED.output_value,
                input_class = EXCLUDED.input_class
        `, [userId, pageName, inputIndex, inputValue, outputValue, inputClass], (err, result) => {
            if (err) {
                console.error(err);
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

    db.query(`SELECT id FROM users WHERE username = $1`, [username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        db.query(`SELECT input_index, input_value, output_value, input_class FROM progress WHERE user_id = $1 AND page_name = $2`,
            [user.id, pageName], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error fetching progress' });
            res.status(200).json({ progress: result.rows });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, db };
