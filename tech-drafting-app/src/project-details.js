import { uploadFile } from './services/storageService.js';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('fileInput');
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Клик върху зоната отваря диалог за избор
dropZone.onclick = () => fileInput.click();

// Drag & Drop събития
dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('bg-light'); };
dropZone.ondragleave = () => dropZone.classList.remove('bg-light');

dropZone.ondrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleUploads(files);
};

fileInput.onchange = (e) => handleUploads(e.target.files);

async function handleUploads(files) {
    for (let file of files) {
        try {
            console.log(`Качване на: ${file.name}`);
            await uploadFile(projectId, file);
            alert(`Файлът ${file.name} е качен успешно!`);
        } catch (err) {
            alert('Грешка: ' + err.message);
        }
    }
    location.reload(); // Опресни списъка
}
