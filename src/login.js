import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Автентикация чрез Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        alert('Грешка при вход: ' + authError.message);
        return;
    }

    // 2. Вземане на ролята от таблица profiles
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

    if (profile?.role === 'admin') {
        window.location.href = '/admin.html'; // Към админ панела
    } else {
        window.location.href = '/dashboard.html'; // Към клиентския панел
    }
});
