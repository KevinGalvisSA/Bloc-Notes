
/*
 *Modal de confirmacion al querer guardar una nota
 */

const modal = document.getElementById('confirmationModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel = document.getElementById('modalCancel');

// Variable para rastrear si estamos en el estado de "descartar"
let isDiscarding = false;

// Función para mostrar el modal
function showModal(action) {
    if (action === 'save') {
        modalTitle.innerText = 'Save changes?';
        modalMessage.innerText = '';
        modalConfirm.innerText = 'Save';
        modalConfirm.onclick = saveNote; // Función para guardar la nota
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

// Funciones de ejemplo para guardar y descartar notas
function saveNote() {
    // Lógica para guardar la nota
    console.log('Nota guardada');
    modal.style.display = 'none'; // Oculta el modal después de guardar
}

function discardNote() {
    // Lógica para descartar la nota
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
 *Funcionamiento de los inputs de texto en el titulo y contenido 
 */
const noteTitle = document.getElementById("noteTitle");

// Al hacer clic, si el texto es "Title", lo borra para permitir la escritura
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
