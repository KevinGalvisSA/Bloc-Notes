import { bookData } from '../js/components/note.js'; // Importamos el arreglo de datos

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

// Redirigir a la página de creación de notas al hacer clic en el botón "+"
document.getElementById("addButton").addEventListener("click", function() {
    window.location.href = "bloc.html"; // Cambia a la página donde se crea la tarjeta
});

// Función para verificar si hay datos en note.js y mostrar la tarjeta
function checkForNotes() {
    const illustration = document.getElementById('illustration');
    const notesContainer = document.getElementById('notesContainer');
    
    if (bookData && bookData.length > 0) {
        illustration.style.display = 'none'; // Oculta la ilustración
        notesContainer.style.display = 'flex'; // Muestra el contenedor de notas

        // Crear y mostrar las tarjetas
        const carousel = document.createElement('div');
        carousel.classList.add('card-carousel');
        notesContainer.appendChild(carousel);

        bookData.forEach(note => {
            const bookCard = document.createElement('book-card'); // Crea un nuevo componente de tarjeta
            bookCard.setAttribute('data-title', note.title); // Establece el título desde los datos
            carousel.appendChild(bookCard); // Añade la tarjeta al carrusel
        });
    } else {
        illustration.style.display = 'block'; // Muestra la ilustración
        notesContainer.style.display = 'none'; // Oculta el contenedor de notas
    }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    checkForNotes(); // Llama a la función para verificar y mostrar notas
});
