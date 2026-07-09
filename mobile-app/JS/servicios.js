// ================================
// DATOS DE LAS SEDES
// ================================

const sedes = [

    {
        nombre: "RENIEC SEDE PRINCIPAL",
        direccion: "Av. Arequipa 1234, Lima",
        distancia: "A 1.2 km",
        logo: "../assets/logo/reniec.png"
    },

    {
        nombre: "RENIEC Surquillo",
        direccion: "Av. Angamos 542",
        distancia: "A 2.1 km",
        logo: "../assets/logo/reniec.png"
    },

    {
        nombre: "RENIEC San Borja",
        direccion: "Av. Aviación 2300",
        distancia: "A 3.4 km",
        logo: "../assets/logo/reniec.png"
    },

    {
        nombre: "RENIEC Miraflores",
        direccion: "Av. Larco 800",
        distancia: "A 4.2 km",
        logo: "../assets/logo/reniec.png"
    }

];


// ================================
// ELEMENTOS
// ================================

const lista = document.getElementById("listaSedes");

const buscador = document.getElementById("txtBuscarSede");

const vistaResultados = document.getElementById("vistaResultados");

const vistaDetalle = document.getElementById("vistaDetalle");

const nombre = document.getElementById("nombreSede");

const direccion = document.getElementById("direccionSede");


// ================================
// MOSTRAR SEDES
// ================================

function cargarSedes(datos){

    lista.innerHTML = "";

    datos.forEach((sede,index)=>{

        lista.innerHTML += `

        <div class="sede-card" data-index="${index}">

            <div class="info">

                <img
                    src="${sede.logo}"
                    class="logo"
                >

                <div>

                    <h4>${sede.nombre}</h4>

                    <p>${sede.distancia}</p>

                </div>

            </div>

            <i class="fa-solid fa-chevron-right"></i>

        </div>

        `;

    });

    activarClicks();

}


// ================================
// CLICK EN UNA SEDE
// ================================

function activarClicks(){

    const cards = document.querySelectorAll(".sede-card");

    cards.forEach(card=>{

        card.onclick = ()=>{

            const sede = sedes[card.dataset.index];

            nombre.textContent = sede.nombre;

            direccion.textContent = sede.direccion;

            vistaResultados.style.display = "none";

            vistaDetalle.style.display = "block";

        }

    });

}



// ================================
// BUSCADOR
// ================================

buscador.addEventListener("input",()=>{

    const texto = buscador.value.toLowerCase();

    const resultado = sedes.filter(s=>

        s.nombre.toLowerCase().includes(texto)

    );

    cargarSedes(resultado);

});



// ================================
// BOTON VOLVER AL MAPA
// ================================

document.getElementById("btnVolverMapa").onclick=()=>{

    cargarVista("mapa.html");

};



// ================================
// VOLVER A RESULTADOS
// ================================

document.getElementById("btnRegresarResultados").onclick=()=>{

    vistaDetalle.style.display="none";

    vistaResultados.style.display="block";

};



// ================================
// CONGESTION
// ================================

document.getElementById("btnCongestion").onclick=()=>{

    cargarVista("congestion.html");

};



// ================================
// INICIO
// ================================

cargarSedes(sedes);