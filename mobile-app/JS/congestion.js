function obtenerDatosCongestion() {
    const servicioGuardado = localStorage.getItem("servicioSeleccionado");

    if (servicioGuardado) {
        return JSON.parse(servicioGuardado);
    }

    return {
        nombre: "Duplicado de DNI",
        establecimiento: "RENIEC",
        personasEnFila: 12,
        tiempoEspera: 35
    };
}

function calcularNivelCongestion(personas) {
    if (personas <= 8) {
        return {
            estado: "Baja",
            porcentaje: 35,
            clase: "baja",
            recomendacion: "Puedes acudir durante el horario actual."
        };
    }

    if (personas <= 18) {
        return {
            estado: "Moderada",
            porcentaje: 65,
            clase: "moderada",
            recomendacion: "Acude entre 2:00 p.m. y 4:00 p.m."
        };
    }

    return {
        estado: "Alta",
        porcentaje: 88,
        clase: "alta",
        recomendacion: "Evita acudir ahora. Se recomienda reservar otro horario."
    };
}

function iniciarCongestion() {
    const datos = obtenerDatosCongestion();
    const nivel = calcularNivelCongestion(datos.personasEnFila || 12);

    const nombreServicio = document.getElementById("nombreServicioCongestion");
    const nombreEstablecimiento = document.getElementById("nombreEstablecimientoCongestion");
    const estado = document.getElementById("estadoCongestion");
    const porcentaje = document.getElementById("porcentajeCongestion");
    const barra = document.getElementById("barraCongestion");
    const personas = document.getElementById("personasFila");
    const tiempo = document.getElementById("tiempoEspera");
    const capacidad = document.getElementById("capacidadAtencion");
    const promedio = document.getElementById("promedioAtencion");
    const recomendacion = document.getElementById("textoRecomendacion");

    if (nombreServicio) nombreServicio.textContent = datos.nombre || "Servicio seleccionado";
    if (nombreEstablecimiento) nombreEstablecimiento.textContent = datos.establecimiento || "Establecimiento";
    if (estado) estado.textContent = nivel.estado;
    if (porcentaje) porcentaje.textContent = `${nivel.porcentaje}%`;
    if (barra) barra.style.width = `${nivel.porcentaje}%`;

    if (personas) personas.textContent = datos.personasEnFila || 12;
    if (tiempo) tiempo.textContent = `${datos.tiempoEspera || 35} min`;
    if (capacidad) capacidad.textContent = `${nivel.porcentaje}%`;
    if (promedio) promedio.textContent = "8 min";
    if (recomendacion) recomendacion.textContent = nivel.recomendacion;

    localStorage.setItem("congestionActual", JSON.stringify({
        ...datos,
        estadoCongestion: nivel.estado,
        porcentajeCongestion: nivel.porcentaje,
        promedioAtencion: 8,
        recomendacion: nivel.recomendacion
    }));
}

window.iniciarCongestion = iniciarCongestion;