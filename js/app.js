document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://rickandmortyapi.com/api/character";
  const container = document.getElementById("characters-container");

  // Filtros
  const genderSelect = document.getElementById("filter-gender");
  const speciesSelect = document.getElementById("filter-species");
  const statusSelect = document.getElementById("filter-status");

  // Evento para aplicar filtros
  genderSelect.addEventListener("change", fetchAndRenderCharacters);
  speciesSelect.addEventListener("change", fetchAndRenderCharacters);
  statusSelect.addEventListener("change", fetchAndRenderCharacters);

  // Función principal
  async function fetchAndRenderCharacters() {
    container.innerHTML = `<div class="text-center text-white">Cargando personajes...</div>`;

    let url = API_URL + "?";

    if (genderSelect.value) url += `gender=${genderSelect.value}&`;
    if (speciesSelect.value) url += `species=${speciesSelect.value}&`;
    if (statusSelect.value) url += `status=${statusSelect.value}&`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        renderCharacters(data.results);
      } else {
        container.innerHTML = `<p class="text-center text-white">No se encontraron personajes con esos filtros.</p>`;
      }
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="text-center text-danger">Error al cargar personajes.</p>`;
    }
  }

  // Render de tarjetas
  function renderCharacters(characters) {
    container.innerHTML = "";

    characters.forEach(character => {
      const card = document.createElement("div");
      card.className = "col-md-3";

      card.innerHTML = `
        <div class="card h-100 bg-secondary text-white border-0 shadow-lg">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">
              <strong>Especie:</strong> ${character.species}<br>
              <strong>Género:</strong> ${character.gender}<br>
              <strong>Estado:</strong> ${character.status}
            </p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // Carga inicial
  fetchAndRenderCharacters();
});
