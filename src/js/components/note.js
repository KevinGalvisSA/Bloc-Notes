// note.js
class BookCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: #ffadad;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 300px;
          color: #333;
        }
        .card h2 {
          margin: 0;
          font-size: 18px;
        }
      </style>
      <div class="card">
        <h2 id="title">Loading...</h2>
      </div>
    `;
  }

  connectedCallback() {
    this.loadTitle();
  }

  loadTitle() {
    const title = this.getAttribute('data-title') || 'Sin título';
    this.shadowRoot.getElementById('title').textContent = title;
  }
}

// Definimos el arreglo de datos de notas directamente aquí
const bookData = [
  { title: "Empezando un nuevo mundo", content: "Contenido de la Nota 1" },
  { title: "Nota 2", content: "Contenido de la Nota 2" },
  { title: "Nota 3", content: "Contenido de la Nota 3" },
  { title: "Nota 1", content: "Contenido de la Nota 1" },
  { title: "Nota 2", content: "Contenido de la Nota 2" },
  { title: "Nota 3", content: "Contenido de la Nota 3" },
];

customElements.define('book-card', BookCard);
export { bookData };
