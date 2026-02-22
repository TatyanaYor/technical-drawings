const translations = {
    bg: {
        welcome: "Добре дошли в Engineering Drafts",
        login: "Вход",
        register: "Регистрация",
        logout: "Изход",
        projects: "Моите проекти",
        new_project: "Нова поръчка"
    },
    en: {
        welcome: "Welcome to Engineering Drafts",
        login: "Login",
        register: "Register",
        logout: "Logout",
        projects: "My Projects",
        new_project: "New Order"
    }
};

export function getTranslation(key) {
    const lang = localStorage.getItem('app_lang') || 'bg';
    return translations[lang][key] || key;
}

export function toggleLanguage() {
    const current = localStorage.getItem('app_lang') || 'bg';
    localStorage.setItem('app_lang', current === 'bg' ? 'en' : 'bg');
    window.location.reload();
}
