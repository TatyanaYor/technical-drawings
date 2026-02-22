import { supabase } from './supabase.js';

const projectsList = document.getElementById('projectsList');
const newProjectForm = document.getElementById('newProjectForm');

// 1. Проверка за сесия
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) window.location.href = '/login.html';
    return user;
}

// 2. Зареждане на проекти
async function loadProjects(userId) {
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', userId)
        .order('created_at', { ascending: false });

    if (error) return console.error(error);
    
    renderProjects(projects);
}

function renderProjects(projects) {
    if (projects.length === 0) {
        projectsList.innerHTML = '<div class="alert alert-info">Все още нямате заявени проекти.</div>';
        return;
    }

    projectsList.innerHTML = projects.map(p => `
        <div class="col-md-4 mb-3">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <span class="badge ${getStatusClass(p.status)} mb-2">${p.status}</span>
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text text-muted small">${p.description || 'Няма описание'}</p>
                    <a href="/project-details.html?id=${p.id}" class="btn btn-outline-primary btn-sm w-100">
                        Виж детайли / Файлове
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusClass(status) {
    const classes = { pending: 'bg-warning', in_progress: 'bg-info', completed: 'bg-success' };
    return classes[status] || 'bg-secondary';
}

// 3. Създаване на нов проект
newProjectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = await checkUser();
    
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDesc').value;

    const { error } = await supabase.from('projects').insert([
        { title, description, client_id: user.id }
    ]);

    if (!error) location.reload();
});

// Инициализация
checkUser().then(user => loadProjects(user.id));
