document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username');
            if (usernameInput && usernameInput.value.trim() !== '') {
                localStorage.setItem('r_gilmore_currentUser', usernameInput.value.trim());
                window.location.href = 'index.html';
            }
        });
    }
});
