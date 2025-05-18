document.addEventListener("DOMContentLoaded", () => {
  const CHAR_API_URL = "https://rickandmortyapi.com/api/character";
  const LOC_API_URL = "https://rickandmortyapi.com/api/location";

  const charactersContainer = document.getElementById("characters-container");
  const locationsContainer = document.getElementById("locations-container");

  // Filtros personajes
  const genderSelect = document.getElementById("filter-gender");
  const speciesSelect = document.getElementById("filter-species");
  const statusSelect = document.getElementById("filter-status");

  // Escuchar cambio de filtros (solo para personajes)
  genderSelect.addEventListener("change", fetchAndRenderCharacters);
  speciesSelect.addEventListener("change", fetchAndRenderCharacters);
  statusSelect.addEventListener("change", fetchAndRenderCharacters);

  // Detectar pestañas
  const tabMenu = document.getElementById("tabMenu");
  tabMenu.addEventListener("click", (event) => {
    if(event.target.id === "characters-tab") {
      fetchAndRenderCharacters();
    }
    if(event.target.id === "locations-tab") {
      fetchAndRenderLocations();
    }
  });

  // Función para cargar y mostrar personajes con filtros
  async function fetchAndRenderCharacters() {
    charactersContainer.innerHTML = `<div class="text-center text-white">Cargando personajes...</div>`;
    locationsContainer.innerHTML = ""; // limpiar planetas

    let url = CHAR_API_URL + "?";

    if (genderSelect.value) url += `gender=${genderSelect.value}&`;
    if (speciesSelect.value) url += `species=${speciesSelect.value}&`;
    if (statusSelect.value) url += `status=${statusSelect.value}&`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        renderCharacters(data.results);
      } else {
        charactersContainer.innerHTML = `<p class="text-center text-white">No se encontraron personajes con esos filtros.</p>`;
      }
    } catch (err) {
      console.error(err);
      charactersContainer.innerHTML = `<p class="text-center text-danger">Error al cargar personajes.</p>`;
    }
  }

  // Render de tarjetas personajes
  function renderCharacters(characters) {
    charactersContainer.innerHTML = "";

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

      charactersContainer.appendChild(card);
    });
  }

  // Función para cargar y mostrar planetas
  async function fetchAndRenderLocations() {
    locationsContainer.innerHTML = `<div class="text-center text-white">Cargando planetas...</div>`;
    charactersContainer.innerHTML = ""; // limpiar personajes

    try {
      const response = await fetch(LOC_API_URL);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        renderLocations(data.results);
      } else {
        locationsContainer.innerHTML = `<p class="text-center text-white">No se encontraron planetas.</p>`;
      }
    } catch (err) {
      console.error(err);
      locationsContainer.innerHTML = `<p class="text-center text-danger">Error al cargar planetas.</p>`;
    }
  }

  // Render de tarjetas planetas
  function renderLocations(locations) {
    locationsContainer.innerHTML = "";

    locations.forEach(location => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      card.innerHTML = `
        <div class="card h-100 bg-secondary text-white border-0 shadow-lg">
          <div class="card-body">
            <h5 class="card-title">${location.name}</h5>
            <p class="card-text">
              <strong>Tipo:</strong> ${location.type}<br>
              <strong>Dimensión:</strong> ${location.dimension}<br>
              <strong>Residentes:</strong> ${location.residents.length}
            </p>
          </div>
        </div>
      `;

      locationsContainer.appendChild(card);
    });
  }

  // Carga inicial de personajes
  fetchAndRenderCharacters();
});
