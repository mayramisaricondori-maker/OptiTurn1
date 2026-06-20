// Función para cambiar de pantalla sin recargar
function navigateTo(viewId) {
    // 1. Ocultar todas las vistas del sitio web
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active-view');
    });

    // 2. Mostrar únicamente la vista a la que se desea ir
    const targetSection = document.getElementById('view-' + viewId);
    if (targetSection) {
        targetSection.classList.add('active-view');
    }

    // 3. Quitar el estado activo "marcado azul" de los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 4. Marcar en azul la pestaña del menú actual
    const activeLink = document.getElementById('link-' + viewId);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 5. Llevar la pantalla arriba automáticamente con un efecto sutil
    window.scrollTo({ top: 0, behavior: 'smooth' });
}