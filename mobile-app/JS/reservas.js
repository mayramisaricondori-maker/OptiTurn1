let horarioReserva = "09:30 AM";

function obtenerServicioReserva() {
    const guardado = localStorage.getItem("servicioSeleccionado");

    if (guardado) return JSON.parse(guardado);

    return {
        nombre: "Duplicado de DNI",
        establecimiento: "RENIEC",
        personasEnFila: 12,
        tiempoEspera: 35
    };
}

function iniciarReservas() {
    const servicio = obtenerServicioReserva();

    const nombre = document.getElementById("reservaServicio");
    const entidad = document.getElementById("reservaEntidad");
    const personas = document.getElementById("reservaPersonas");
    const tiempo = document.getElementById("reservaTiempo");
    const horario = document.getElementById("horarioElegido");

    if (nombre) nombre.textContent = servicio.nombre || "Duplicado de DNI";
    if (entidad) entidad.textContent = servicio.establecimiento || "RENIEC";
    if (personas) personas.textContent = servicio.personasEnFila || 12;
    if (tiempo) tiempo.textContent = `${servicio.tiempoEspera || 35} min`;
    if (horario) horario.textContent = horarioReserva;
}

function seleccionarHorarioReserva(elemento, horario) {
    horarioReserva = horario;

    document.querySelectorAll(".horario-opcion").forEach((item) => {
        item.classList.remove("active");
    });

    elemento.classList.add("active");

    const horarioTexto = document.getElementById("horarioElegido");
    if (horarioTexto) horarioTexto.textContent = horarioReserva;
}

function confirmarReserva() {
    const servicio = obtenerServicioReserva();

    const reserva = {
        codigo: "A025",
        servicio: servicio.nombre || "Duplicado de DNI",
        establecimiento: servicio.establecimiento || "RENIEC",
        horario: horarioReserva,
        personasEnFila: servicio.personasEnFila || 12,
        tiempoEspera: servicio.tiempoEspera || 35,
        estado: "Confirmado"
    };

    localStorage.setItem("reservaActual", JSON.stringify(reserva));
    cargarVista("qr.html");
}

window.iniciarReservas = iniciarReservas;
window.seleccionarHorarioReserva = seleccionarHorarioReserva;
window.confirmarReserva = confirmarReserva;