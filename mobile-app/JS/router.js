const app = document.getElementById("app");

const vistasPublicas = new Set([
    "splash",
    "login",
    "registro",
    "success",
    "recuperar",
    "correo",
    "nuevaPassword",
    "passwordOk"
]);

const regresosFijos = {
    establecimientos: "dashboard.html",
    misTurnos: "dashboard.html",
    fila: "dashboard.html",
    perfil: "dashboard.html",
    qr: "misTurnos.html",
    notificaciones: "dashboard.html",
    calificacion: "notificaciones.html",
    soporte: "notificaciones.html"
};

let vistaActual = null;
let historialVistas = [];
let cargandoVista = false;

const recursosPorVista = {
    splash: {
        css: ["CSS/splash.css"]
    },

    login: {
        css: ["CSS/login.css"],
        js: ["JS/login.js"],
        init: "iniciarLogin"
    },

    registro: {
        css: ["CSS/registro.css"],
        js: ["JS/registro.js"],
        init: "iniciarRegistro"
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

    fila: {
        css: ["CSS/reservas.css"]
    },

    qr: {
        css: ["CSS/reservas.css"],
        js: ["JS/qr.js"],
        init: "iniciarQR"
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

    perfil: {}
};

function obtenerNombreVista(vista) {
    return vista.replace(".html", "");
}

function cargarCSS(ruta) {
    return new Promise((resolve) => {
        const existente = document.querySelector(
            `link[data-css-ruta="${ruta}"]`
        );

        if (existente) {
            resolve();
            return;
        }

        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = ruta;

      
        link.dataset.cssVista = "true";
        link.dataset.cssRuta = ruta;

        link.onload = resolve;

        link.onerror = () => {
            console.error(`No se pudo cargar el CSS: ${ruta}`);
            resolve();
        };

        document.head.appendChild(link);
    });
}

function cargarJS(ruta) {
    return new Promise((resolve) => {
        const existente = document.querySelector(
            `script[data-js-ruta="${ruta}"]`
        );

        if (existente) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src = ruta;
        script.dataset.jsRuta = ruta;

        script.onload = resolve;

        script.onerror = () => {
            console.error(
                `No se pudo cargar el JavaScript: ${ruta}`
            );

            resolve();
        };

        document.body.appendChild(script);
    });
}

async function cargarRecursosVista(nombreVista) {
    const recursos = recursosPorVista[nombreVista] || {};

    const rutasCSS = recursos.css || [];
    const rutasJS = recursos.js || [];


    for (const ruta of rutasCSS) {
        await cargarCSS(ruta);
    }

   
    document
        .querySelectorAll('link[data-css-vista="true"]')
        .forEach((link) => {
            const rutaCSS = link.dataset.cssRuta;

            if (!rutasCSS.includes(rutaCSS)) {
                link.remove();
            }
        });

   
    for (const ruta of rutasJS) {
        await cargarJS(ruta);
    }
}


function activarBotonesGenerales() {
    const btnComenzar = app.querySelector(".btn-start");
    const btnComenzarId = app.querySelector("#btnComenzar");
    const btnRegistro = app.querySelector(".btn-registro");
    const btnVolverDashboard = app.querySelector("#btnVolverDashboard");

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

function volverVista(fallback = "dashboard.html") {
    let destino = historialVistas.pop();

    while (destino === vistaActual) {
        destino = historialVistas.pop();
    }

    cargarVista(destino || fallback, {
        registrarHistorial: false
    });
}


function configurarBotonRegreso(nombreVista) {
    const botonRegreso = app.querySelector(
        [
            ".app-back-btn",
            ".back-btn",
            ".btn-back",
            ".recover-back",
            ".signup-back"
        ].join(", ")
    );

    if (!botonRegreso) return;

    botonRegreso.onclick = () => {
        const destinoFijo = regresosFijos[nombreVista];

        if (destinoFijo) {
            historialVistas = [];

            cargarVista(destinoFijo, {
                registrarHistorial: false
            });

            return;
        }

        const fallback = vistasPublicas.has(nombreVista)
            ? "login.html"
            : "dashboard.html";

        volverVista(fallback);
    };
}


function prepararVista(nombreVista) {
    const pantalla = app.firstElementChild;

    if (!pantalla) return;

    const esVistaInterna = !vistasPublicas.has(nombreVista);


    app.classList.toggle("app-interna", esVistaInterna);

    pantalla.classList.add("vista-activa");

   
    const barraInferior = pantalla.querySelector(".bottom-nav");

    if (barraInferior) {
       
        pantalla.classList.add("con-barra-inferior");

        app.appendChild(barraInferior);
    }

    
    pantalla.scrollTop = 0;

    configurarBotonRegreso(nombreVista);
}

async function cargarVista(vista, opciones = {}) {
    const {
        registrarHistorial = true
    } = opciones;

    if (cargandoVista) return;

    if (vista === vistaActual) {
        const pantalla = app.firstElementChild;

        if (pantalla) {
            pantalla.scrollTop = 0;
        }

        return;
    }

    cargandoVista = true;

    try {
        const respuesta = await fetch(`views/${vista}`);

        if (!respuesta.ok) {
            throw new Error(`No se encontró la vista: ${vista}`);
        }

        const html = await respuesta.text();
        const nombreVista = obtenerNombreVista(vista);

      
        app.classList.add("app-cargando");

        await cargarRecursosVista(nombreVista);

        if (
            vistaActual &&
            registrarHistorial &&
            vistaActual !== vista
        ) {
            historialVistas.push(vistaActual);
        }

        app.innerHTML = html;

        prepararVista(nombreVista);
        activarBotonesGenerales();
        ejecutarInicializador(nombreVista);

        vistaActual = vista;

        app.scrollTop = 0;

        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        app.classList.remove("app-cargando");

    } catch (error) {
        console.error(error);

        app.classList.remove("app-cargando");
        app.classList.remove("app-interna");

        app.innerHTML = `
            <div style="
                padding: 70px 22px;
                text-align: center;
                background: #F5F7FB;
                min-height: 100%;
            ">
                <h2 style="
                    color: #1769FF;
                    margin-bottom: 8px;
                ">
                    Error cargando pantalla
                </h2>

                <p style="
                    color: #64748B;
                    font-size: 13px;
                ">
                    ${error.message}
                </p>

                <button
                    onclick="cargarVista('dashboard.html')"
                    style="
                        margin-top: 18px;
                        border: none;
                        background: #1769FF;
                        color: white;
                        padding: 12px 18px;
                        border-radius: 14px;
                    "
                >
                    Volver al inicio
                </button>
            </div>
        `;

    } finally {
        cargandoVista = false;
    }
}

window.cargarVista = cargarVista;
window.volverVista = volverVista;

window.addEventListener("DOMContentLoaded", () => {
    cargarVista("splash.html", {
        registrarHistorial: false
    });
});