
//menu
let menu_responsive = document.querySelector(".checkbtn");
menu_responsive.onclick = function () {
  navBar = document.querySelector(".navbar");
  navBar.classList.toggle("active");
};

// publucaciones
document.addEventListener("DOMContentLoaded", function() {
  const publicaciones = document.querySelectorAll('.publicacion');
  let index = 0;
  let intervalId;

  function mostrarPublicacion(i) {
      if (i >= publicaciones.length) {
          index = 0;
      }
      if (i < 0) {
          index = publicaciones.length - 1;
      }

      publicaciones.forEach(publicacion => {
          publicacion.classList.remove('active');
      });

      publicaciones[index].classList.add('active');
  }

  function avanzarAutomaticamente() {
      intervalId = setInterval(() => {
          index++;
          mostrarPublicacion(index);
      }, 3000); // Cambia el tiempo de transición aquí (en milisegundos)
  }

  function detenerAvanceAutomatico() {
      clearInterval(intervalId);
  }

  function mostrarSiguiente() {
      detenerAvanceAutomatico();
      index++;
      mostrarPublicacion(index);
      avanzarAutomaticamente();
  }

  function mostrarAnterior() {
      detenerAvanceAutomatico();
      index--;
      mostrarPublicacion(index);
      avanzarAutomaticamente();
  }

  // Mostrar la primera publicación al cargar la página y comenzar el avance automático
  mostrarPublicacion(index);
  avanzarAutomaticamente();

  // Agregar eventos para navegar entre las publicaciones
  document.querySelector('.anterior').addEventListener('click', mostrarAnterior);
  document.querySelector('.siguiente').addEventListener('click', mostrarSiguiente);

  // Detener el avance automático al pasar el ratón sobre las publicaciones
  document.querySelector('.publicaciones').addEventListener('mouseenter', detenerAvanceAutomatico);
  document.querySelector('.publicaciones').addEventListener('mouseleave', avanzarAutomaticamente);
});

// mostrar mas archivos recientes 
document.addEventListener("DOMContentLoaded", function() {
    const listaPdf = document.querySelectorAll('.lista-pdf li');
    const botonLeerMas = document.querySelector('.leer-mas');

    // Ocultar archivos adicionales
    for (let i = 3; i < listaPdf.length; i++) {
        listaPdf[i].style.display = 'none';
    }

    botonLeerMas.addEventListener('click', function() {
        for (let i = 3; i < listaPdf.length; i++) {
            if (listaPdf[i].style.display === 'none') {
                listaPdf[i].style.display = 'list-item';
                botonLeerMas.textContent = 'Leer menos';
            } else {
                listaPdf[i].style.display = 'none';
                botonLeerMas.textContent = 'Leer más';
            }
        }
    });
});

// ordenar por fecha
// Obtén todos los elementos de la lista
let lista = document.querySelectorAll('.lista-pdf li');

// Convierte el NodeList a un array para poder ordenarlo
lista = Array.from(lista);

// Ordena el array por la fecha en el href del enlace dentro de cada elemento de la lista
lista.sort((a, b) => {
    let fechaA = a.querySelector('a').href.split('_')[1].split('.')[0];
    let fechaB = b.querySelector('a').href.split('_')[1].split('.')[0];
    return fechaB - fechaA;
});

// Si el primer elemento está oculto, remueve la clase 'oculto'
if (lista[0].classList.contains('oculto')) {
    lista[0].classList.remove('oculto');
}

// Ahora, vuelve a agregar los elementos a la lista en el orden correcto
let ul = document.querySelector('.lista-pdf');
ul.innerHTML = '';
for (let li of lista) {
    ul.appendChild(li);
}
