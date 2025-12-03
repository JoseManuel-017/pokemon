document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-pokemons");

  if (!contenedor || !Array.isArray(pokemons)) return;

  pokemons.forEach(pokemon => {
    const card = document.createElement("div");

    // clase base
    card.classList.add("pokemon-card");

    // clase por tipo
    if (pokemon.tipo) {
      const tipoClase = "pokemon-card--" + pokemon.tipo.toLowerCase();
      card.classList.add(tipoClase);
    }

    card.innerHTML = `
      <div class="pokemon-card-contenido">
        <h3>${pokemon.nombre}</h3>
        ${pokemon.imagen ? `<img src="${pokemon.imagen}" alt="${pokemon.nombre}" class="pokemon-imagen" />` : ""}
        <p class="pokemon-tipo"><strong>Tipo:</strong> ${pokemon.tipo}</p>
        <p class="pokemon-descripcion">${pokemon.descripcion}</p>
        <p class="pokemon-precio"><strong>Precio:</strong> ${pokemon.precio.toFixed(2)} €</p>
        <button class="boton boton-capturar">Añadir al equipo</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
});