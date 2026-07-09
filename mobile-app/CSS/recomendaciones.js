function obtenerDatosRecomendaciones() {
    const datos = localStorage.getItem("congestionActual");

    if (datos) {
        return JSON.parse(datos);
    }

    return {
        recomendacion: "Acude entre 2:00 p.m. y 4:00 p.m."
    };
}

function iniciarRecomendaciones() {
    const datos = obtenerDatosRecomendaciones();

    const recomendacionTexto = document.getElementById("recomendacionTexto");

    if (recomendacionTexto) {
        recomendacionTexto.textContent = datos.recomendacion || "Acude entre 2:00 p.m. y 4:00 p.m.";
    }
}

window.iniciarRecomendaciones = iniciarRecomendaciones;