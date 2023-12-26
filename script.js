let menu_responsive = document.querySelector(".checkbtn");
menu_responsive.onclick = function () {
  navBar = document.querySelector(".navbar");
  navBar.classList.toggle("active");
};


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

