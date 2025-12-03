// ===== Gestión de sesión segura (token + usuario) =====

function guardarSesion(authResponse) {
  // authResponse = { token, user: { id, name, email } }
  sessionStorage.setItem('token', authResponse.token);
  sessionStorage.setItem('usuario', JSON.stringify(authResponse.user));
}

function getToken() {
  return sessionStorage.getItem('token');
}

function getUsuario() {
  const data = sessionStorage.getItem('usuario');
  return data ? JSON.parse(data) : null;
}

function cerrarSesion() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('usuario');
  window.location.href = 'index.html';
}

// Hacemos accesibles las funciones a otros scripts
window.getToken = getToken;
window.getUsuario = getUsuario;
window.cerrarSesion = cerrarSesion;

// ===== Registro =====

async function manejarRegistro(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const resp = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, email, password })
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.error || 'Error al registrarse');
      return;
    }

    guardarSesion(data);
    window.location.href = 'pokemons.html';
  } catch (e) {
    console.error(e);
    alert('Error de conexión con el servidor');
  }
}

// ===== Login =====

async function manejarLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const resp = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.error || 'Error al iniciar sesión');
      return;
    }

    guardarSesion(data);
    window.location.href = 'pokemons.html';
  } catch (e) {
    console.error(e);
    alert('Error de conexión con el servidor');
  }
}

// ===== Asignación de eventos =====

document.addEventListener('DOMContentLoaded', () => {
  const formRegistro = document.getElementById('form-registro');
  const formLogin = document.getElementById('form-login');

  if (formRegistro) {
    formRegistro.addEventListener('submit', manejarRegistro);
  }

  if (formLogin) {
    formLogin.addEventListener('submit', manejarLogin);
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', cerrarSesion);
  }
});
