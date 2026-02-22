import { supabase } from './supabase.js';
import { toggleLanguage } from './utils/i18n.js';

// Инициализация на езика
document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);

export async function initAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');

    if (user) {
        authButtons.classList.add('d-none');
        userMenu.classList.remove('d-none');
        document.getElementById('userName').innerText = user.email;
    }

    // Логика за Изход
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '/index.html';
    });
}

initAuth();
