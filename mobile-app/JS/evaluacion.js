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
    const comentarioInput = document.getElementById("comentarioCalificacion");
    const comentario = comentarioInput
        ? comentarioInput.value.trim()
        : "";

    if (puntajeSeleccionado === 0) {
        alert("Selecciona una calificación antes de enviar.");
        return;
    }

    const turnoGuardado = localStorage.getItem("turnoActivo");
    const reservaGuardada = localStorage.getItem("reservaActual");

    let institucion = "RENIEC";
    let servicio = "Duplicado de DNI";

    if (turnoGuardado) {
        const turno = JSON.parse(turnoGuardado);
        institucion = turno.institucion || institucion;
        servicio = turno.servicio || servicio;
    } else if (reservaGuardada) {
        const reserva = JSON.parse(reservaGuardada);
        institucion = reserva.establecimiento || institucion;
        servicio = reserva.servicio || servicio;
    }

    const calificacion = {
        institucion,
        servicio,
        puntaje: puntajeSeleccionado,
        comentario: comentario || "Sin comentario",
        fecha: new Date().toLocaleDateString("es-PE")
    };

    localStorage.setItem(
        "calificacionServicio",
        JSON.stringify(calificacion)
    );

    alert("Gracias por calificar tu experiencia.");

    cargarVista("dashboard.html");
}