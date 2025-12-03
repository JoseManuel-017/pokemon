// document.addEventListener("DOMContentLoaded", () => {
//   const navbar = document.getElementById("navbar");
//   const usuarioEmail = localStorage.getItem("usuarioEmail");

//   if (!navbar) return;

//   // Si NO está logeado
//   if (!usuarioEmail) {
//     navbar.innerHTML = `
//       <a href="index.html">Inicio</a>
//     `;
//   } 
//   // Si SÍ está logeado
//   else {
//     navbar.innerHTML = `
//       <a href="index.html">Inicio</a>
//       <a href="pokemons.html">Pokemons</a>
//       <a href="perfil.html">Perfil</a>
//       <a id="logout" href="#">Cerrar sesión</a>
//     `;

//     document.getElementById("logout").addEventListener("click", () => {
//       localStorage.removeItem("usuarioEmail");
//       window.location.href = "index.html";
//     });
//   }
// });

// js/nav.js

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const usuarioEmail = localStorage.getItem("usuarioEmail");

  if (!navbar) return;

  // Siempre mostramos estas opciones mientras estás maquetando
  let html = `
    <a href="index.html">Inicio</a>
    <a href="pokemons.html">Pokemons</a>
    <a href="perfil.html">Perfil</a>
  `;

  // Solo añadimos "Cerrar sesión" si hay usuario
  if (usuarioEmail) {
    html += `<a id="logout" href="#">Cerrar sesión</a>`;
  }

  navbar.innerHTML = html;

  if (usuarioEmail) {
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
      localStorage.removeItem("usuarioEmail");
      window.location.href = "index.html";
    });
  }
});
