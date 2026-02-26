import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Грешка: " + error.message);
    } else {
        // ТОВА ИЗПРАЩА КЪМ ТАБЛОТО
        window.location.assign('/dashboard.html');
    }
});
