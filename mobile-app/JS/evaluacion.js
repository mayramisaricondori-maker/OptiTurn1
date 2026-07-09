let puntajeSeleccionado = 0;

function iniciarCalificacion() {
    puntajeSeleccionado = 0;

    const estrellas = document.querySelectorAll("#stars button");
    const comentario = document.getElementById("comentarioCalificacion");

    estrellas.forEach((estrella) => {
        estrella.classList.remove("activo");
    });

    if (comentario) {
        comentario.value = "";
    }
}

function seleccionarPuntaje(puntaje) {
    puntajeSeleccionado = puntaje;

    const estrellas = document.querySelectorAll("#stars button");

    estrellas.forEach((estrella, index) => {
        if (index < puntaje) {
            estrella.classList.add("activo");
        } else {
            estrella.classList.remove("activo");
        }
    });
}

function enviarCalificacion() {
    const comentario = document.getElementById("comentarioCalificacion").value.trim();

    if (puntajeSeleccionado === 0) {
        alert("Selecciona una calificación antes de enviar.");
        return;
    }

    const calificacion = {
        institucion: "RENIEC",
        servicio: "Duplicado de DNI",
        puntaje: puntajeSeleccionado,
        comentario: comentario || "Sin comentario",
        fecha: new Date().toLocaleDateString("es-PE")
    };

    localStorage.setItem("calificacionServicio", JSON.stringify(calificacion));

    alert("Gracias por calificar tu experiencia.");

    cargarVista("dashboard.html");
}

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    if (!app) return;

    const observador = new MutationObserver(() => {
        const pantalla = document.querySelector(".calificacion-screen");

        if (pantalla && !pantalla.dataset.iniciada) {
            pantalla.dataset.iniciada = "true";
            iniciarCalificacion();
        }
    });

    observador.observe(app, {
        childList: true,
        subtree: true
    });
});