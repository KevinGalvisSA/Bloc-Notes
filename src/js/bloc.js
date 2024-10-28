/*
 * Modal de confirmación al querer guardar una nota
 */
const modal = document.getElementById('confirmationModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');

// Variable para rastrear si estamos en el estado de "descartar"
let isDiscarding = false;

// Seleccionar los elementos de título y contenido de la nota
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");

// Función para mostrar el modal
function showModal(action) {
    if (action === 'save') {
        modalTitle.innerText = 'Save changes?';
        modalMessage.innerText = 'Are you sure you want to save changes?';
        modalConfirm.innerText = 'Save';
        modalConfirm.onclick = saveNote; // Asignar la función de guardar
        isDiscarding = false; // No estamos en el estado de "descartar"
    }
    modal.style.display = 'flex'; // Muestra el modal
}

// Cambiar el contenido del modal al hacer clic en "Discard"
modalCancel.onclick = function() {
    if (!isDiscarding) {
        modalTitle.innerText = 'Discard changes?';
        modalMessage.innerText = 'Are you sure you want to discard changes?';
        modalConfirm.innerText = 'Keep'; // Cambia "Save" a "Keep"
        modalConfirm.onclick = function() {
            // Al hacer clic en "Keep", simplemente cerramos el modal
            modal.style.display = 'none'; // Oculta el modal
        };
        isDiscarding = true; // Activamos el estado de "descartar"
    } else {
        // Si ya estamos en estado de "descartar" y se hace clic de nuevo
        discardNote(); // Llama a la función para descartar la nota
    }
};

// Función para guardar la nota en localStorage
function saveNote() {
    const title = noteTitle.textContent.trim(); // Título del h1
    const content = noteContent.value.trim(); // Contenido del textarea
    
    // Guardar en localStorage
    localStorage.setItem('noteTitle', title);
    localStorage.setItem('noteContent', content);

    console.log('Nota guardada');
    modal.style.display = 'none'; // Oculta el modal después de guardar
    alert("Nota guardada con éxito."); // Notificación opcional
}

// Función para descartar cambios en la nota
function discardNote() {
    console.log('Cambios descartados');
    modal.style.display = 'none'; // Oculta el modal después de descartar
    isDiscarding = false; // Reiniciar el estado de "descartar"
}

/*
 * Funcionamiento del botón de retroceder
 */
const goback = document.getElementById('back');
goback.onclick = function() {
    window.history.back();
};

/*
 * Funcionamiento de los inputs de texto en el título y contenido
 */
// Al hacer clic en el título, si es "Title", lo borra para permitir la escritura
noteTitle.addEventListener("focus", () => {
    if (noteTitle.innerText.trim() === "Title") {
        noteTitle.innerText = "";
        noteTitle.style.color = "white"; // Cambia el color del texto al escribir
    }
});

// Al perder el foco, si está vacío, muestra "Title" de nuevo
noteTitle.addEventListener("blur", () => {
    if (noteTitle.innerText.trim() === "") {
        noteTitle.innerText = "Title";
        noteTitle.style.color = "gray"; // Cambia el color al gris para el placeholder
    }
});

// Opcional: cargar el contenido guardado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTitle = localStorage.getItem('noteTitle');
    const savedContent = localStorage.getItem('noteContent');
    
    if (savedTitle) noteTitle.textContent = savedTitle;
    if (savedContent) noteContent.value = savedContent;
});
