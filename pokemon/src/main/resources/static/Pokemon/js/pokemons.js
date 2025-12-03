document.addEventListener('DOMContentLoaded', () => {
  // Si no hay token, mandamos a login
  if (!getToken()) {
    window.location.href = 'login.html';
    return;
  }
  cargarPokemons();
});

async function cargarPokemons() {
  const container = document.getElementById('lista-pokemons');
  container.innerHTML = '';

  try {
    const resp = await fetch(`${POKEAPI_BASE}/pokemon?limit=20&offset=0`);
    const data = await resp.json();

    for (const item of data.results) {
      const pokeResp = await fetch(item.url);
      const poke = await pokeResp.json();

      const id = poke.id;
      const name = poke.name;
      const imageUrl =
        poke.sprites.other['official-artwork'].front_default ||
        poke.sprites.front_default;
      const types = poke.types.map(t => t.type.name).join(', ');

      const esFavorito = await comprobarFavorito(id);

      const card = crearCardPokemon(id, name, imageUrl, types, esFavorito);
      container.appendChild(card);
    }
  } catch (e) {
    console.error(e);
    alert('Error cargando pokémons');
  }
}

async function comprobarFavorito(pokemonId) {
  try {
    const token = getToken();
    const resp = await fetch(`${API_BASE}/favorites/${pokemonId}/exists`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!resp.ok) return false;
    return await resp.json();
  } catch {
    return false;
  }
}

function crearCardPokemon(id, name, imageUrl, types, esFavorito) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = name;

  const titulo = document.createElement('h3');
  titulo.textContent = name;

  const tipo = document.createElement('p');
  tipo.textContent = `Tipo: ${types}`;

  const btnFav = document.createElement('button');
  btnFav.classList.add('btn-favorito');
  if (esFavorito) {
    btnFav.classList.add('favorito-activo');
    btnFav.textContent = '★ Favorito';
  } else {
    btnFav.textContent = '☆ Añadir a favoritos';
  }

  btnFav.addEventListener('click', () =>
    toggleFavorito(id, name, imageUrl, types, btnFav)
  );

  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(tipo);
  card.appendChild(btnFav);

  return card;
}

async function toggleFavorito(pokemonId, name, imageUrl, types, boton) {
  const token = getToken();
  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = 'login.html';
    return;
  }

  const esFavorito = boton.classList.contains('favorito-activo');

  try {
    if (!esFavorito) {
      const resp = await fetch(`${API_BASE}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pokemonId,
          name,
          imageUrl,
          type: types
        })
      });

      const data = await resp.json();
      if (!resp.ok) {
        alert(data.error || 'No se pudo añadir a favoritos');
        return;
      }

      boton.classList.add('favorito-activo');
      boton.textContent = '★ Favorito';
    } else {
      const resp = await fetch(`${API_BASE}/favorites/${pokemonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!resp.ok && resp.status !== 204) {
        const texto = await resp.text();
        alert(texto || 'No se pudo quitar de favoritos');
        return;
      }

      boton.classList.remove('favorito-activo');
      boton.textContent = '☆ Añadir a favoritos';
    }
  } catch (e) {
    console.error(e);
    alert('Error al actualizar favoritos');
  }
}
