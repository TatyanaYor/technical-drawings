import { supabase } from './api/supabase.js';

async function loadAllProjects() {
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            id, title, status, created_at,
            profiles ( full_name, company_name )
        `)
        .order('created_at', { ascending: false });

    if (error) return console.error("Достъп отказан:", error.message);

    const tableBody = document.getElementById('adminProjectsTable');
    tableBody.innerHTML = projects.map(p => `
        <tr>
            <td><strong>${p.title}</strong></td>
            <td>${p.profiles.full_name} <br><small class="text-muted">${p.profiles.company_name}</small></td>
            <td>${new Date(p.created_at).toLocaleDateString()}</td>
            <td><span class="badge bg-info">${p.status}</span></td>
            <td>
                <select class="form-select form-select-sm" onchange="updateStatus('${p.id}', this.value)">
                    <option value="pending" ${p.status === 'pending' ? 'selected' : ''}>Изчакващ</option>
                    <option value="in_progress" ${p.status === 'in_progress' ? 'selected' : ''}>В процес</option>
                    <option value="completed" ${p.status === 'completed' ? 'selected' : ''}>Завършен</option>
                </select>
            </td>
        </tr>
    `).join('');
}

// Функция за промяна на статус (Глобална за достъп от HTML)
window.updateStatus = async (id, newStatus) => {
    const { error } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', id);
    
    if (!error) alert("Статусът е обновен успешно!");
};

loadAllProjects();
