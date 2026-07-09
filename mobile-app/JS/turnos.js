function obtenerReservaActual() {
    const guardado = localStorage.getItem("reservaActual");

    if (guardado) return JSON.parse(guardado);

    return {
        codigo: "A025",
        servicio: "Duplicado de DNI",
        establecimiento: "RENIEC",
        horario: "09:30 AM",
        personasEnFila: 12,
        tiempoEspera: 35,
        estado: "Confirmado"
    };
}

function iniciarMisTurnos() {
    const reserva = obtenerReservaActual();

    const servicio = document.getElementById("turnoServicio");
    const entidad = document.getElementById("turnoEntidad");
    const horario = document.getElementById("turnoHorario");

    if (servicio) servicio.textContent = reserva.servicio;
    if (entidad) entidad.textContent = reserva.establecimiento;
    if (horario) horario.textContent = reserva.horario;
}

function cancelarTurno() {
    localStorage.removeItem("reservaActual");
    alert("Tu turno fue cancelado correctamente.");
    cargarVista("dashboard.html");
}

function reprogramarTurno() {
    cargarVista("reservas.html");
}

window.iniciarMisTurnos = iniciarMisTurnos;
window.cancelarTurno = cancelarTurno;
window.reprogramarTurno = reprogramarTurno;