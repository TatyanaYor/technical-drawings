import { supabase } from './supabase.js';

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const companyName = document.getElementById('companyName').value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullName,
                company: companyName
            }
        }
    });

    if (error) {
        alert('Грешка при регистрация: ' + error.message);
        return;
    }
    alert('Успешна регистрация! Моля, потвърдете имейла си.');
    window.location.href = '/login.html';
});
