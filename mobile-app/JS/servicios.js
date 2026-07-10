const serviciosBase = [
    {
        nombre: "Duplicado de DNI",
        descripcion: "Solicita una nueva copia de tu documento.",
        icono: "fa-solid fa-id-card",
        personasEnFila: 12,
        tiempoEspera: 35
    },
    {
        nombre: "Actualización de datos",
        descripcion: "Modifica dirección, estado civil u otros datos.",
        icono: "fa-solid fa-pen-to-square",
        personasEnFila: 9,
        tiempoEspera: 28
    },
    {
        nombre: "Rectificación de datos",
        descripcion: "Corrige información registrada en tu documento.",
        icono: "fa-solid fa-file-signature",
        personasEnFila: 15,
        tiempoEspera: 40
    },
    {
        nombre: "Consulta de trámite",
        descripcion: "Revisa el estado de un trámite iniciado.",
        icono: "fa-solid fa-magnifying-glass-chart",
        personasEnFila: 7,
        tiempoEspera: 18
    }
];

let serviciosVisibles = [...serviciosBase];

function obtenerEstablecimientoServicios() {
    const guardado = localStorage.getItem("establecimientoSeleccionado");

    if (guardado) {
        return JSON.parse(guardado);
    }

    return {
        nombre: "RENIEC",
        descripcion: "Registro de identificación",
        distancia: "A 1.2 km",
        icono: "fa-solid fa-id-card"
    };
}

function pintarEstablecimientoServicios() {
    const establecimiento = obtenerEstablecimientoServicios();

    const nombre = document.getElementById("servicioEstablecimiento");
    const descripcion = document.getElementById("servicioDescripcion");
    const distancia = document.getElementById("servicioDistancia");
    const icono = document.getElementById("servicioIcono");

    if (nombre) nombre.textContent = establecimiento.nombre;
    if (descripcion) descripcion.textContent = establecimiento.descripcion || "Servicios disponibles";
    if (distancia) distancia.textContent = establecimiento.distancia || "A 1.2 km";

    if (icono) {
        icono.className = establecimiento.icono || "fa-solid fa-id-card";
    }
}

function pintarServicios(datos) {
    const lista = document.getElementById("listaServicios");

    if (!lista) return;
    serviciosVisibles = datos;
    lista.innerHTML = "";

    datos.forEach((servicio, index) => {
        lista.innerHTML += `
            <div class="servicio-card" onclick="seleccionarServicio(${index})">
                <div class="servicio-card-icon">
                    <i class="${servicio.icono}"></i>
                </div>

                <div class="servicio-card-info">
                    <h4>${servicio.nombre}</h4>
                    <p>${servicio.descripcion}</p>
                </div>

                <i class="fa-solid fa-chevron-right"></i>
            </div>
        `;
    });
}

function seleccionarServicio(index) {
    const servicio = serviciosVisibles[index];
    if (!servicio) return;
    const establecimiento = obtenerEstablecimientoServicios();

    const servicioSeleccionado = {
        ...servicio,
        establecimiento: establecimiento.nombre,
        descripcionEstablecimiento: establecimiento.descripcion || "Servicios disponibles",
        distancia: establecimiento.distancia || "A 1.2 km"
    };

    localStorage.setItem("servicioSeleccionado", JSON.stringify(servicioSeleccionado));

    const cards = document.querySelectorAll(".servicio-card");
    cards.forEach((card) => card.classList.remove("active"));

    if (cards[index]) {
        cards[index].classList.add("active");
    }

    document.getElementById("nombreServicioSeleccionado").textContent = servicio.nombre;
    document.getElementById("detalleServicioSeleccionado").textContent = servicio.descripcion;
    document.getElementById("personasServicio").textContent = servicio.personasEnFila;
    document.getElementById("tiempoServicio").textContent = `${servicio.tiempoEspera} min`;

    document.getElementById("servicioSeleccionadoBox").classList.remove("oculto");
    setTimeout(() => {
    const pantalla = document.querySelector(".servicios-screen");

    if (pantalla) {
        pantalla.scrollTo({
            top: pantalla.scrollHeight,
            behavior: "smooth"
        });
    }
    }, 100);
}

function buscarServicios() {
    const input = document.getElementById("buscarServicio");

    if (!input) return;

    input.addEventListener("input", () => {
        const texto = input.value.toLowerCase();

        const filtrados = serviciosBase.filter((servicio) =>
            servicio.nombre.toLowerCase().includes(texto) ||
            servicio.descripcion.toLowerCase().includes(texto)
        );

        pintarServicios(filtrados);
    });
}

function irACongestion() {
    const seleccionado = localStorage.getItem("servicioSeleccionado");

    if (!seleccionado) {
        alert("Selecciona un servicio antes de continuar.");
        return;
    }

    cargarVista("congestion.html");
}

function irAReservas() {
    const seleccionado = localStorage.getItem(
        "servicioSeleccionado"
    );

    if (!seleccionado) {
        alert("Selecciona un servicio antes de reservar.");
        return;
    }

    cargarVista("reservas.html");
}

function iniciarServicios() {
    pintarEstablecimientoServicios();
    pintarServicios(serviciosBase);
    buscarServicios();
}

window.seleccionarServicio = seleccionarServicio;
window.irACongestion = irACongestion;
window.iniciarServicios = iniciarServicios;
window.irAReservas = irAReservas;

