function obtenerEstablecimientoMapa() {
    const guardado = localStorage.getItem("establecimientoSeleccionado");

    if (guardado) {
        return JSON.parse(guardado);
    }

    return {
        nombre: "RENIEC",
        descripcion: "Registro de identificación",
        distancia: "A 1.2 km",
        icono: "fa-solid fa-id-card",
        servicio: "Duplicado de DNI",
        tiempoEspera: 35,
        personasEnFila: 12
    };
}

function iniciarMapa() {
    const establecimiento = obtenerEstablecimientoMapa();

    const nombre = document.getElementById("mapaNombre");
    const descripcion = document.getElementById("mapaDescripcion");
    const distancia = document.getElementById("mapaDistancia");
    const tiempo = document.getElementById("mapaTiempo");
    const icono = document.getElementById("mapaIcono");

    if (nombre) nombre.textContent = establecimiento.nombre;
    if (descripcion) descripcion.textContent = establecimiento.descripcion || establecimiento.servicio;
    if (distancia) distancia.textContent = establecimiento.distancia || "A 1.2 km";
    if (tiempo) tiempo.textContent = `${establecimiento.tiempoEspera || 35} min`;

    if (icono) {
        icono.className = establecimiento.icono || "fa-solid fa-id-card";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    if (!app) return;

    const observador = new MutationObserver(() => {
        const pantalla = document.querySelector(".mapa-screen");

        if (pantalla && !pantalla.dataset.iniciada) {
            pantalla.dataset.iniciada = "true";
            iniciarMapa();
        }
    });

    observador.observe(app, {
        childList: true,
        subtree: true
    });
});