const app = document.getElementById("app");

const recursosPorVista = {
    splash: {
        css: ["CSS/splash.css"]
    },
    login: {
        css: ["CSS/login.css"],
        js: ["JS/login.js"]
    },
    registro: {
        css: ["CSS/registro.css"],
        js: ["JS/registro.js"]
    },
    success: {
        css: ["CSS/success.css"]
    },
    recuperar: {
        css: ["CSS/recuperar.css"]
    },
    correo: {
        css: ["CSS/recuperar.css"]
    },
    nuevaPassword: {
        css: ["CSS/recuperar.css"]
    },
    passwordOk: {
        css: ["CSS/success.css"]
    },
    dashboard: {
        css: ["CSS/dashboard.css"]
    },
    establecimientos: {
        css: ["CSS/establecimientos.css"],
        js: ["JS/establecimientos.js"],
        init: "iniciarEstablecimientos"
    },
    mapa: {
        css: ["CSS/mapa.css"],
        js: ["JS/mapa.js"],
        init: "iniciarMapa"
    },
    servicios: {
        css: ["CSS/servicios.css"],
        js: ["JS/servicios.js"],
        init: "iniciarServicios"
    },
    notificaciones: {
        css: ["CSS/notificaciones.css"],
        js: ["JS/notificaciones.js"],
        init: "iniciarNotificaciones"
    },
    calificacion: {
        css: ["CSS/notificaciones.css"],
        js: ["JS/evaluacion.js"],
        init: "iniciarCalificacion"
    },
    soporte: {
        css: ["CSS/notificaciones.css", "CSS/soporte.css"],
        js: ["JS/soporte.js"]
    },
    busqueda: {
        css: ["CSS/busqueda.css"],
        js: ["JS/busqueda.js"]
    },
    fila: {
        css: ["CSS/fila.css"],
        js: ["JS/fila.js"]
    },

    gestion: {
        css: ["CSS/gestion.css"],
        js: ["JS/gestion.js"]
    },
    perfil: {
    css: ["CSS/base.css"]
    },
    congestion: {
    css: ["CSS/congestion.css"],
    js: ["JS/congestion.js"],
    init: "iniciarCongestion"
    },
    tiempos: {
    css: ["CSS/estadisticas.css"],
    js: ["JS/tiempos.js"],
    init: "iniciarTiempos"
    },
    recomendaciones: {
    css: ["CSS/estadisticas.css"],
    js: ["JS/recomendaciones.js"],
    init: "iniciarRecomendaciones"
    },
    reservas: {
    css: ["CSS/reservas.css"],
    js: ["JS/reservas.js"],
    init: "iniciarReservas"
    },
    misTurnos: {
    css: ["CSS/reservas.css"],
    js: ["JS/turnos.js"],
    init: "iniciarMisTurnos"
    },
    qr: {
    css: ["CSS/reservas.css"],
    js: ["JS/qr.js"],
    init: "iniciarQR"
    }
};

function obtenerNombreVista(vista) {
    return vista.replace(".html", "");
}

function cargarCSS(ruta) {
    return new Promise((resolve) => {
        const existe = document.querySelector(`link[href="${ruta}"]`);

        if (existe) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = ruta;
        link.onload = resolve;
        link.onerror = resolve;

        document.head.appendChild(link);
    });
}

function cargarJS(ruta) {
    return new Promise((resolve) => {
        const existe = document.querySelector(`script[src="${ruta}"]`);

        if (existe) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = ruta;
        script.onload = resolve;
        script.onerror = resolve;

        document.body.appendChild(script);
    });
}

async function cargarRecursosVista(nombreVista) {
    const recursos = recursosPorVista[nombreVista];

    if (!recursos) return;

    if (recursos.css) {
        for (const ruta of recursos.css) {
            await cargarCSS(ruta);
        }
    }

    if (recursos.js) {
        for (const ruta of recursos.js) {
            await cargarJS(ruta);
        }
    }
}

function activarBotonesGenerales() {
    const btnComenzar = document.querySelector(".btn-start");
    const btnComenzarId = document.getElementById("btnComenzar");
    const btnRegistro = document.querySelector(".btn-registro");
    const btnVolverDashboard = document.getElementById("btnVolverDashboard");

    if (btnComenzar) {
        btnComenzar.onclick = () => cargarVista("login.html");
    }

    if (btnComenzarId) {
        btnComenzarId.onclick = () => cargarVista("login.html");
    }

    if (btnRegistro) {
        btnRegistro.onclick = () => cargarVista("registro.html");
    }

    if (btnVolverDashboard) {
        btnVolverDashboard.onclick = () => cargarVista("dashboard.html");
    }
}

function ejecutarInicializador(nombreVista) {
    const recursos = recursosPorVista[nombreVista];

    if (!recursos || !recursos.init) return;

    const funcion = window[recursos.init];

    if (typeof funcion === "function") {
        funcion();
    }
}

async function cargarVista(vista) {
    try {
        const respuesta = await fetch(`views/${vista}`);

        if (!respuesta.ok) {
            throw new Error(`No se encontró la vista: ${vista}`);
        }

        const html = await respuesta.text();
        const nombreVista = obtenerNombreVista(vista);

        app.classList.add("app-cambiando");

        await cargarRecursosVista(nombreVista);

       setTimeout(() => {
            app.innerHTML = html;

            app.scrollTop = 0;

            const pantallaActual = app.firstElementChild;

            if (pantallaActual) {
                pantallaActual.scrollTop = 0;
            }

            activarBotonesGenerales();
            ejecutarInicializador(nombreVista);

            requestAnimationFrame(() => {
                app.classList.remove("app-cambiando");
            });
        }, 80);

    } catch (error) {
        console.error(error);

        app.innerHTML = `
            <div style="padding: 70px 22px; text-align: center;">
                <h2 style="color:#1769FF; margin-bottom: 8px;">Error cargando pantalla</h2>
                <p style="color:#64748B; font-size:13px;">${error.message}</p>
                <button 
                    onclick="cargarVista('dashboard.html')"
                    style="margin-top:18px; border:none; background:#1769FF; color:white; padding:12px 18px; border-radius:14px;"
                >
                    Volver al inicio
                </button>
            </div>
        `;
    }
}

window.cargarVista = cargarVista;

window.addEventListener("DOMContentLoaded", () => {
    cargarVista("splash.html");
});