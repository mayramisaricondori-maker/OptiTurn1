// ==========================
// DATOS
// ==========================

const establecimientos = [

    {
        nombre:"RENIEC",
        descripcion:"Registro de identificación",
        distancia:"A 1.2 km",
        categoria:"tramites",
        logo:"../assets/logo/reniec.png"
    },

    {
        nombre:"SUNAT",
        descripcion:"Superintendencia Nacional",
        distancia:"A 1.8 km",
        categoria:"tramites",
        logo:"../assets/logo/sunat.png"
    },

    {
        nombre:"Municipalidad de Lima",
        descripcion:"Trámites municipales",
        distancia:"A 2.1 km",
        categoria:"tramites",
        logo:"../assets/logo/muni.png"
    },

    {
        nombre:"Banco de la Nación",
        descripcion:"Servicios bancarios",
        distancia:"A 2.3 km",
        categoria:"tramites",
        logo:"../assets/logo/banco.png"
    },

    {
        nombre:"EsSalud",
        descripcion:"Superintendencia Nacional",
        distancia:"A 1.8 km",
        categoria:"salud",
        logo:"../assets/logo/essalud.png"
    },

    {
        nombre:"SISOL",
        descripcion:"Hospital de la Solidaridad",
        distancia:"A 1.2 km",
        categoria:"salud",
        logo:"../assets/logo/sisol.png"
    },

    {
        nombre:"Línea 1",
        descripcion:"Metro de Lima",
        distancia:"A 1.2 km",
        categoria:"transporte",
        logo:"../assets/logo/linea1.png"
    },

    {
        nombre:"ATU",
        descripcion:"Autoridad de Transporte Urbano",
        distancia:"A 1.8 km",
        categoria:"transporte",
        logo:"../assets/logo/atu.png"
    }

];


// ==========================
// VARIABLES
// ==========================

const lista = document.getElementById("listaResultados");
const buscar = document.getElementById("txtBuscar");
const categorias = document.querySelectorAll(".categoria");
const volver = document.getElementById("btnVolverDashboard");

let categoriaActual = "todos";


// ==========================
// MOSTRAR TARJETAS
// ==========================

function mostrar(listaDatos){

    lista.innerHTML="";

    if(listaDatos.length===0){

        lista.innerHTML=`

        <p style="text-align:center;color:#777;margin-top:30px;">
            No se encontraron resultados.
        </p>

        `;

        return;

    }

    listaDatos.forEach(item=>{

        lista.innerHTML+=`

        <div class="resultado-card">

            <div class="info">

                <div class="logo-box">

                    <img src="${item.logo}">

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

    activarClick();

}


// ==========================
// FILTRAR
// ==========================

function filtrar(){

    let datos = establecimientos;

    if(categoriaActual!="todos"){

        datos = datos.filter(e=>e.categoria===categoriaActual);

    }

    const texto = buscar.value.toLowerCase();

    datos = datos.filter(e=>

        e.nombre.toLowerCase().includes(texto)

    );

    mostrar(datos);

}


// ==========================
// CLICK TARJETAS
// ==========================

function activarClick(){

    const cards=document.querySelectorAll(".resultado-card");

    cards.forEach((card,index)=>{

        card.onclick=()=>{

            const establecimiento=establecimientos.filter(e=>{

                if(categoriaActual==="todos") return true;

                return e.categoria===categoriaActual;

            }).filter(e=>

                e.nombre.toLowerCase().includes(buscar.value.toLowerCase())

            )[index];

            if(establecimiento.nombre==="RENIEC"){

                cargarVista("mapa.html");

            }else{

                alert(establecimiento.nombre);

            }

        }

    });

}


// ==========================
// BUSCADOR
// ==========================

buscar.addEventListener("input",filtrar);


// ==========================
// CATEGORIAS
// ==========================

categorias.forEach(cat=>{

    cat.onclick=()=>{

        categorias.forEach(c=>{

            c.classList.remove("active");

        });

        cat.classList.add("active");

        categoriaActual=cat.dataset.categoria;

        filtrar();

    }

});


// ==========================
// VOLVER
// ==========================

volver.onclick=()=>{

    cargarVista("dashboard.html");

};


// ==========================
// INICIO
// ==========================

filtrar();