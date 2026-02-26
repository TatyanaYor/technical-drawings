import { supabase } from './api/supabase.js'; 

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Опит за вход в Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('Грешка: ' + error.message);
    } else {
        // 2. ВАЖНОТО ПРЕНАСОЧВАНЕ: Изпраща потребителя към таблото
        window.location.href = '/dashboard.html';
    }
});