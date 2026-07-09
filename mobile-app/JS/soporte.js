function enviarSoporte() {
    const tipoConsulta = document.getElementById("tipoConsulta").value;
    const mensaje = document.getElementById("mensajeSoporte").value.trim();

    if (!tipoConsulta) {
        alert("Selecciona el motivo de tu consulta.");
        return;
    }

    if (!mensaje) {
        alert("Escribe un mensaje breve para soporte.");
        return;
    }

    const nuevoTicket = {
        motivo: tipoConsulta,
        mensaje: mensaje,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString("es-PE")
    };

    const ticketsGuardados = JSON.parse(localStorage.getItem("ticketsSoporte")) || [];
    ticketsGuardados.push(nuevoTicket);

    localStorage.setItem("ticketsSoporte", JSON.stringify(ticketsGuardados));

    const mensajeOk = document.getElementById("mensajeSoporteOk");

    if (mensajeOk) {
    mensajeOk.textContent = "Tu solicitud fue enviada correctamente.";
    }

    document.getElementById("tipoConsulta").value = "";
    document.getElementById("mensajeSoporte").value = "";
}

function mostrarRespuesta(idRespuesta) {
    const respuesta = document.getElementById(idRespuesta);

    if (!respuesta) return;

    respuesta.classList.toggle("mostrar");

    const pregunta = respuesta.previousElementSibling;
    const flecha = pregunta.querySelector(".faq-arrow");

    if (flecha) {
        flecha.classList.toggle("rotar");
    }
}