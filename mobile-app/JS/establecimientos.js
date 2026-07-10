const establecimientos = [
    {
        nombre: "RENIEC",
        descripcion: "Registro de identificación",
        distancia: "A 1.2 km",
        categoria: "tramites",
        icono: "fa-solid fa-id-card",
        servicio: "Duplicado de DNI",
        tiempoEspera: 35,
        personasEnFila: 12
    },
    {
        nombre: "SUNAT",
        descripcion: "Superintendencia Nacional",
        distancia: "A 1.8 km",
        categoria: "tramites",
        icono: "fa-solid fa-landmark",
        servicio: "Orientación tributaria",
        tiempoEspera: 42,
        personasEnFila: 18
    },
    {
        nombre: "Municipalidad de Lima",
        descripcion: "Trámites municipales",
        distancia: "A 2.1 km",
        categoria: "tramites",
        icono: "fa-solid fa-building-columns",
        servicio: "Licencias y pagos",
        tiempoEspera: 28,
        personasEnFila: 9
    },
    {
        nombre: "Banco de la Nación",
        descripcion: "Servicios bancarios",
        distancia: "A 2.3 km",
        categoria: "tramites",
        icono: "fa-solid fa-building-columns",
        servicio: "Pago de tasas",
        tiempoEspera: 50,
        personasEnFila: 22
    },
    {
        nombre: "EsSalud",
        descripcion: "Atención y citas de salud",
        distancia: "A 1.8 km",
        categoria: "salud",
        icono: "fa-solid fa-hospital",
        servicio: "Consulta externa",
        tiempoEspera: 60,
        personasEnFila: 25
    },
    {
        nombre: "SISOL",
        descripcion: "Hospital de la Solidaridad",
        distancia: "A 1.2 km",
        categoria: "salud",
        icono: "fa-solid fa-user-doctor",
        servicio: "Atención médica",
        tiempoEspera: 33,
        personasEnFila: 14
    },
    {
        nombre: "Línea 1",
        descripcion: "Metro de Lima",
        distancia: "A 1.2 km",
        categoria: "transporte",
        icono: "fa-solid fa-train-subway",
        servicio: "Ingreso a estación",
        tiempoEspera: 15,
        personasEnFila: 7
    },
    {
        nombre: "ATU",
        descripcion: "Autoridad de Transporte Urbano",
        distancia: "A 1.8 km",
        categoria: "transporte",
        icono: "fa-solid fa-bus",
        servicio: "Atención al usuario",
        tiempoEspera: 24,
        personasEnFila: 10
    }
];

let categoriaActual = "todos";

function obtenerListaFiltrada() {
    const input = document.getElementById("txtBuscar");
    const texto = input ? input.value.toLowerCase().trim() : "";

    let datos = establecimientos;

    if (categoriaActual !== "todos") {
        datos = datos.filter((item) => item.categoria === categoriaActual);
    }

    if (texto) {
        datos = datos.filter((item) =>
            item.nombre.toLowerCase().includes(texto) ||
            item.descripcion.toLowerCase().includes(texto) ||
            item.servicio.toLowerCase().includes(texto)
        );
    }

    return datos;
}

function pintarEstablecimientos(datos) {
    const lista = document.getElementById("listaResultados");

    if (!lista) return;

    lista.innerHTML = "";

    if (datos.length === 0) {
        lista.innerHTML = `
            <div class="resultado-vacio">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>No se encontraron establecimientos.</p>
            </div>
        `;
        return;
    }

    datos.forEach((item, index) => {
        lista.innerHTML += `
            <div class="resultado-card" onclick="seleccionarEstablecimiento(${index})">
                <div class="info">
                    <div class="logo-box">
                        <i class="${item.icono}"></i>
                    </div>

                    <div class="datos">
                        <h4>${item.nombre}</h4>
                        <p>${item.descripcion}</p>
                        <span class="distancia">${item.distancia}</span>
                    </div>
                </div>

                <i class="fa-solid fa-chevron-right"></i>
            </div>
        `;
    });
}

function actualizarResultados() {
    pintarEstablecimientos(obtenerListaFiltrada());
}

function seleccionarEstablecimiento(index) {
    const datosActuales = obtenerListaFiltrada();
    const establecimiento = datosActuales[index];

    if (!establecimiento) return;

    localStorage.setItem("establecimientoSeleccionado", JSON.stringify(establecimiento));
    cargarVista("mapa.html");
}

function activarCategoriasEstablecimientos() {
    const categorias = document.querySelectorAll(".categoria");

    categorias.forEach((categoria) => {
        categoria.onclick = () => {
            categorias.forEach((item) => item.classList.remove("active"));

            categoria.classList.add("active");
            categoriaActual = categoria.dataset.categoria || "todos";

            actualizarResultados();
        };
    });
}

function activarBuscadorEstablecimientos() {
    const input = document.getElementById("txtBuscar");

    if (!input) return;

    input.value = "";
    input.oninput = actualizarResultados;
}

function iniciarEstablecimientos() {
    categoriaActual = "todos";

    const categorias = document.querySelectorAll(".categoria");
    categorias.forEach((item) => item.classList.remove("active"));

    const categoriaTodos = document.querySelector('[data-categoria="todos"]');
    if (categoriaTodos) categoriaTodos.classList.add("active");

    activarCategoriasEstablecimientos();
    activarBuscadorEstablecimientos();
    pintarEstablecimientos(establecimientos);
}

window.iniciarEstablecimientos = iniciarEstablecimientos;
window.seleccionarEstablecimiento = seleccionarEstablecimiento;