function obtenerDatosTiempos() {
    const datos = localStorage.getItem("congestionActual");

    if (datos) {
        return JSON.parse(datos);
    }

    return {
        nombre: "Duplicado de DNI",
        establecimiento: "RENIEC",
        personasEnFila: 12,
        tiempoEspera: 35,
        porcentajeCongestion: 65,
        promedioAtencion: 8
    };
}

function iniciarTiempos() {
    const datos = obtenerDatosTiempos();

    const tiempoActual = document.getElementById("tiempoActual");
    const servicioTiempo = document.getElementById("servicioTiempo");
    const personasTiempo = document.getElementById("personasTiempo");
    const promedioTiempo = document.getElementById("promedioTiempo");
    const capacidadTiempo = document.getElementById("capacidadTiempo");
    const horarioActual = document.getElementById("horarioActual");

    if (tiempoActual) tiempoActual.textContent = `${datos.tiempoEspera || 35} min`;
    if (servicioTiempo) servicioTiempo.textContent = `${datos.nombre} - ${datos.establecimiento}`;
    if (personasTiempo) personasTiempo.textContent = `${datos.personasEnFila || 12} personas antes de ti`;
    if (promedioTiempo) promedioTiempo.textContent = `${datos.promedioAtencion || 8} minutos por persona`;
    if (capacidadTiempo) capacidadTiempo.textContent = `${datos.porcentajeCongestion || 65}% de ocupación`;
    if (horarioActual) horarioActual.textContent = `${datos.tiempoEspera || 35} min`;
}

window.iniciarTiempos = iniciarTiempos;