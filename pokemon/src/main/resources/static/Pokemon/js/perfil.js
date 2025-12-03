document.addEventListener('DOMContentLoaded', () => {
  if (!getToken()) {
    window.location.href = 'login.html';
    return;
  }
  cargarPerfil();
});

async function cargarPerfil() {
  const usuario = getUsuario();
  const spanNombre = document.getElementById('usuario-nombre');
  const spanEmail = document.getElementById('usuario-email');

  if (usuario) {
    if (spanNombre) spanNombre.textContent = usuario.name;
    if (spanEmail) spanEmail.textContent = usuario.email;
  }

  await cargarFavoritos();
}

async function cargarFavoritos() {
  const contFavs = document.getElementById('lista-favoritos');
  contFavs.innerHTML = '';

  try {
    const token = getToken();
    const resp = await fetch(`${API_BASE}/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!resp.ok) {
      contFavs.textContent = 'Error cargando favoritos';
      return;
    }

    const favoritos = await resp.json();

    if (!favoritos.length) {
      contFavs.textContent = 'No tienes pokémons favoritos todavía.';
      return;
    }

    favoritos.forEach(fav => {
      const card = document.createElement('div');
      card.classList.add('pokemon-card');

      const img = document.createElement('img');
      img.src = fav.imageUrl;
      img.alt = fav.name;

      const titulo = document.createElement('h3');
      titulo.textContent = fav.name;

      const tipo = document.createElement('p');
      tipo.textContent = `Tipo: ${fav.type}`;

      card.appendChild(img);
      card.appendChild(titulo);
      card.appendChild(tipo);

      contFavs.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    contFavs.textContent = 'Error cargando favoritos';
  }
}
