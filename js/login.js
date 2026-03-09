document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleFormLink = document.getElementById('toggle-form');
    const toggleText = document.getElementById('toggle-text');
    const loginMessage = document.getElementById('login-message');
    const headerTitle = document.querySelector('.login-card h2');
    const headerDesc = document.querySelector('.login-card p');

    let isLoginMode = true;

    if (toggleText) {
        toggleText.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'toggle-form') {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                loginMessage.style.display = 'none';

                if (isLoginMode) {
                    loginForm.style.display = 'block';
                    registerForm.style.display = 'none';
                    headerTitle.innerText = 'Welcome Back';
                    headerDesc.innerText = 'Please enter your credentials to continue your studies.';
                    toggleText.innerHTML = `Don't have an account? <br><a href="#" id="toggle-form" class="text-yale-blue fw-bold">Create one at the town meeting</a>`;
                } else {
                    loginForm.style.display = 'none';
                    registerForm.style.display = 'block';
                    headerTitle.innerText = 'Join the Town Meeting';
                    headerDesc.innerText = 'Create an account to save your R Gilmore progress.';
                    toggleText.innerHTML = `Already have an account? <br><a href="#" id="toggle-form" class="text-yale-blue fw-bold">Back to Login</a>`;
                }
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value;

            if (usernameInput && passwordInput) {
                try {
                    if (window.location.protocol === 'file:') {
                        throw new Error('You are running the app via file://. Please use a local server (e.g., npm start).');
                    }

                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: usernameInput, password: passwordInput })
                    });

                    const contentType = response.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                         throw new Error('Server returned an invalid response. Make sure you are running the Node.js backend (npm start) and not a static file server.');
                    }

                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem('r_gilmore_currentUser', data.username);
                        localStorage.setItem('r_gilmore_token', data.token);
                        window.location.href = 'index.html';
                    } else {
                        loginMessage.innerText = data.error || 'Login failed';
                        loginMessage.style.display = 'block';
                    }
                } catch (error) {
                    loginMessage.innerText = error.message.includes('Failed to fetch') || error.message.includes('NetworkError')
                        ? 'Network error. Ensure the server is running on port 8000.'
                        : error.message;
                    loginMessage.style.display = 'block';
                }
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('reg-username').value.trim();
            const passwordInput = document.getElementById('reg-password').value;

            if (usernameInput && passwordInput) {
                try {
                    if (window.location.protocol === 'file:') {
                        throw new Error('You are running the app via file://. Please use a local server (e.g., npm start).');
                    }

                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: usernameInput, password: passwordInput })
                    });

                    const contentType = response.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                         throw new Error('Server returned an invalid response. Make sure you are running the Node.js backend (npm start) and not a static file server.');
                    }

                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem('r_gilmore_currentUser', data.username);
                        localStorage.setItem('r_gilmore_token', data.token);
                        window.location.href = 'index.html';
                    } else {
                        loginMessage.innerText = data.error || 'Registration failed';
                        loginMessage.style.display = 'block';
                    }
                } catch (error) {
                    loginMessage.innerText = error.message.includes('Failed to fetch') || error.message.includes('NetworkError')
                        ? 'Network error. Ensure the server is running on port 8000.'
                        : error.message;
                    loginMessage.style.display = 'block';
                }
            }
        });
    }
});
