import { supabase } from './api/supabase.js';

async function loadDashboard() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/login.html'; return; }
    
    document.getElementById('userEmail').innerText = user.email;

    // Извличане на проекти
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

    const container = document.getElementById('projectsContainer');
    if (error || !projects.length) {
        container.innerHTML = '<div class="text-center opacity-50">Няма открити активни проекти.</div>';
        return;
    }

    container.innerHTML = projects.map(p => {
        // Логика за прогрес спрямо статуса
        let progress = 20; 
        let statusText = "В изчакване";
        let color = "warning";

        if(p.status === 'in_progress') { progress = 60; statusText = "В разработка"; color = "primary"; }
        if(p.status === 'completed') { progress = 100; statusText = "Завършен"; color = "success"; }

        // Примерна крайна дата (7 дни след създаването, ако няма записана в DB)
        const deadline = new Date(p.created_at);
        deadline.setDate(deadline.getDate() + 7);

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card project-card shadow-sm p-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3">
                            <span class="badge bg-${color} status-badge">${statusText}</span>
                            <small class="text-muted"><i class="bi bi-calendar-event"></i> Срок: ${deadline.toLocaleDateString()}</small>
                        </div>
                        <h5 class="fw-bold mb-2">${p.title}</h5>
                        <p class="small text-muted mb-4">${p.description || 'Няма допълнително описание.'}</p>
                        
                        <label class="small fw-bold mb-1">Фаза на разработка: ${progress}%</label>
                        <div class="progress mb-3" style="height: 10px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-${color}" 
                                 role="progressbar" style="width: ${progress}%"></div>
                        </div>
                        
                        <a href="/project-details.html?id=${p.id}" class="btn btn-outline-dark btn-sm w-100 mt-2">Детайли и Файлове</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = '/index.html';
});

loadDashboard();