function obtenerTurnoActivo() {
    const turnoGuardado = localStorage.getItem("turnoActivo");

    if (turnoGuardado) {
        return JSON.parse(turnoGuardado);
    }

    return {
        institucion: "RENIEC",
        servicio: "Duplicado de DNI",
        horario: "09:30 AM",
        tiempoEstimado: "35 min",
        estado: "Pendiente de confirmación"
    };
}

function guardarTurnoActivo(turno) {
    localStorage.setItem("turnoActivo", JSON.stringify(turno));
}

function pintarEstadoAsistencia(estadoActual) {
    const estado = document.getElementById("estadoTurno");
    const btnConfirmar = document.getElementById("btnConfirmarAsistencia");
    const btnCancelar = document.getElementById("btnCancelarAsistencia");

    if (!estado || !btnConfirmar || !btnCancelar) return;

    if (estadoActual === "Asistencia confirmada") {
        estado.textContent = "Asistencia confirmada";
        estado.style.color = "#16A34A";
        estado.style.fontWeight = "600";

        btnConfirmar.textContent = "Asistencia confirmada";
        btnConfirmar.disabled = true;
        btnConfirmar.style.background = "#16A34A";
        btnConfirmar.style.cursor = "default";

        btnCancelar.classList.remove("oculto");
        return;
    }

    estado.textContent = "Pendiente de confirmación";
    estado.style.color = "#666";
    estado.style.fontWeight = "400";

    btnConfirmar.textContent = "Confirmar asistencia";
    btnConfirmar.disabled = false;
    btnConfirmar.style.background = "#2563EB";
    btnConfirmar.style.cursor = "pointer";

    btnCancelar.classList.add("oculto");
}

function iniciarNotificaciones() {
    const turno = obtenerTurnoActivo();

    const institucion = document.getElementById("notiInstitucion");
    const servicio = document.getElementById("notiServicio");
    const horario = document.getElementById("notiHorario");
    const tiempo = document.getElementById("notiTiempo");

    if (institucion) institucion.textContent = turno.institucion;
    if (servicio) servicio.textContent = turno.servicio;
    if (horario) horario.textContent = turno.horario;
    if (tiempo) tiempo.textContent = turno.tiempoEstimado;

    pintarEstadoAsistencia(turno.estado);
}

function confirmarAsistencia() {
    const turno = obtenerTurnoActivo();

    turno.estado = "Asistencia confirmada";

    guardarTurnoActivo(turno);
    pintarEstadoAsistencia(turno.estado);
}

function cancelarAsistencia() {
    const turno = obtenerTurnoActivo();

    turno.estado = "Pendiente de confirmación";

    guardarTurnoActivo(turno);
    pintarEstadoAsistencia(turno.estado);
}

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    if (!app) return;

    const observador = new MutationObserver(() => {
        const pantalla = document.querySelector(".notificaciones-screen");

        if (pantalla && !pantalla.dataset.iniciada) {
            pantalla.dataset.iniciada = "true";
            iniciarNotificaciones();
        }
    });

    observador.observe(app, {
        childList: true,
        subtree: true
    });
});