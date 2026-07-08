const app = document.getElementById("app");


async function cargarVista(vista){

    try{

        const respuesta = await fetch(`views/${vista}`);


        if(!respuesta.ok){

            throw new Error("No se encontró la vista");

        }


        const html = await respuesta.text();


        app.innerHTML = html;


        // ejecutar scripts de la vista actual
        activarFuncionesVista();


    }catch(error){

        console.error(error);

        app.innerHTML = `
            <h2>Error cargando pantalla</h2>
        `;

    }

}



function activarFuncionesVista(){


    // Botón comenzar del splash

    const btnComenzar = document.querySelector(".btn-start");


    if(btnComenzar){

        btnComenzar.addEventListener("click",()=>{

            cargarVista("login.html");

        });

    }



    // Botón ir a registro

    const btnRegistro = document.querySelector(".btn-registro");


    if(btnRegistro){

        btnRegistro.addEventListener("click",()=>{

            cargarVista("registro.html");

        });

    }


}



// cargar pantalla inicial

window.addEventListener("DOMContentLoaded",()=>{

    cargarVista("index.html");

});
function activarFuncionesVista(){


    const boton = document.getElementById("btnComenzar");


    if(boton){

        boton.onclick = () => {

            cargarVista("login.html");

        };

    }


}