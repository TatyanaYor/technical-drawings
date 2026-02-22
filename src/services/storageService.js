import { supabase } from '../api/supabase.js';

export async function uploadFile(projectId, file) {
    const user = (await supabase.auth.getUser()).data.user;
    // Пътят на файла включва ID на проекта за организация
    const filePath = `${user.id}/${projectId}/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
        .from('drawings')
        .upload(filePath, file);

    if (error) throw error;

    // Записваме метаданните в DB таблицата 'documents'
    const { error: dbError } = await supabase
        .from('documents')
        .insert([{
            project_id: projectId,
            file_name: file.name,
            file_url: data.path,
            uploaded_by: user.id
        }]);

    if (dbError) throw dbError;
    return data;
}
