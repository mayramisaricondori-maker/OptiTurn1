function obtenerReservaActual() {
    const guardado = localStorage.getItem("reservaActual");

    if (!guardado) return null;

    try {
        return JSON.parse(guardado);
    } catch (error) {
        console.error(
            "La reserva guardada no es válida:",
            error
        );

        return null;
    }
}

function iniciarMisTurnos() {
    const reserva = obtenerReservaActual();
    const tarjeta = document.querySelector(".turno-card");

    if (!tarjeta) return;

    if (!reserva) {
        tarjeta.innerHTML = `
            <div class="turno-vacio">
                <i class="fa-solid fa-calendar-xmark"></i>

                <h3>No tienes turnos activos</h3>

                <p>
                    Selecciona un servicio y reserva
                    un nuevo turno.
                </p>

                <button
                    type="button"
                    class="btn-primary"
                    onclick="cargarVista('establecimientos.html')"
                >
                    Buscar establecimiento
                </button>
            </div>
        `;

        return;
    }

    const servicio = document.getElementById(
        "turnoServicio"
    );

    const entidad = document.getElementById(
        "turnoEntidad"
    );

    const horario = document.getElementById(
        "turnoHorario"
    );

    const detalles = tarjeta.querySelectorAll(
        ".turno-detalles strong"
    );

    if (servicio) {
        servicio.textContent = reserva.servicio;
    }

    if (entidad) {
        entidad.textContent = reserva.establecimiento;
    }

    if (horario) {
        horario.textContent = reserva.horario;
    }

    if (detalles[1]) {
        detalles[1].textContent =
            reserva.personasEnFila;
    }

    if (detalles[2]) {
        detalles[2].textContent =
            `${reserva.tiempoEspera} min`;
    }
}

function cancelarTurno() {
    const confirmar = window.confirm(
        "¿Deseas cancelar este turno?"
    );

    if (!confirmar) return;

    localStorage.removeItem("reservaActual");
    localStorage.removeItem("turnoActivo");

    alert("Tu turno fue cancelado correctamente.");

   
    iniciarMisTurnos();
}

function reprogramarTurno() {
    const reserva = obtenerReservaActual();

    if (!reserva) {
        cargarVista("establecimientos.html");
        return;
    }

    cargarVista("reservas.html");
}

window.iniciarMisTurnos = iniciarMisTurnos;
window.cancelarTurno = cancelarTurno;
window.reprogramarTurno = reprogramarTurno;