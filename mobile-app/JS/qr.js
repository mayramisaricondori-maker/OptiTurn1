function iniciarQR() {
    const guardado = localStorage.getItem("reservaActual");

    const reserva = guardado ? JSON.parse(guardado) : {
        codigo: "A025",
        servicio: "Duplicado de DNI",
        establecimiento: "RENIEC",
        horario: "09:30 AM"
    };

    const servicio = document.getElementById("qrServicio");
    const entidad = document.getElementById("qrEntidad");
    const codigo = document.getElementById("codigoTurno");

    if (servicio) servicio.textContent = reserva.servicio;
    if (entidad) entidad.textContent = `${reserva.establecimiento} - ${reserva.horario}`;
    if (codigo) codigo.textContent = reserva.codigo;
}

window.iniciarQR = iniciarQR;