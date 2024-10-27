
// Obtener el modal y los elementos de cierre/apertura
const infoIcon = document.querySelector('.icon-button:nth-child(2)'); // Segundo icono de información
const modal = document.getElementById('infoModal');
const closeModal = document.getElementById('closeModal');

// Abrir el modal al hacer clic en el icono de información
infoIcon.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


