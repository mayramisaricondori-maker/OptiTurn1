const app = document.getElementById("app");



async function cargarVista(vista){

    try{

        const respuesta = await fetch(`views/${vista}`);


        if(!respuesta.ok){

            throw new Error("No se encontró la vista");

        }


        const html = await respuesta.text();


        app.innerHTML = html;



        // cargar CSS y JS de la vista actual
        cargarRecursosVista(vista);



        // activar botones de la vista actual
        activarFuncionesVista();



    }catch(error){

        console.error(error);

        app.innerHTML = `
            <h2>Error cargando pantalla</h2>
        `;

    }

}






function cargarRecursosVista(vista){


    const nombreVista = vista.replace(".html","");



    // =====================
    // CARGAR CSS
    // =====================


    const cssExistente = document.getElementById(
        `css-${nombreVista}`
    );


    if(!cssExistente){


        const link = document.createElement("link");


        link.id = `css-${nombreVista}`;

        link.rel = "stylesheet";

        link.href = `CSS/${nombreVista}.css`;


        document.head.appendChild(link);


    }





    // =====================
    // CARGAR JS
    // =====================


    const scriptExistente = document.getElementById(
        `js-${nombreVista}`
    );



    if(!scriptExistente){


        const script = document.createElement("script");


        script.id = `js-${nombreVista}`;

        script.src = `JS/${nombreVista}.js`;

        script.defer = true;


        document.body.appendChild(script);


    }


}









function activarFuncionesVista(){



    // =====================
    // BOTÓN COMENZAR
    // =====================


    const btnComenzar = document.querySelector(".btn-start");



    if(btnComenzar){


        btnComenzar.onclick = () => {


            cargarVista("login.html");


        };


    }







    // =====================
    // BOTÓN REGISTRO
    // =====================


    const btnRegistro = document.querySelector(".btn-registro");



    if(btnRegistro){


        btnRegistro.onclick = () => {


            cargarVista("registro.html");


        };


    }








    // =====================
    // VOLVER DASHBOARD
    // =====================


    const btnVolverDashboard = document.getElementById(
        "btnVolverDashboard"
    );



    if(btnVolverDashboard){


        btnVolverDashboard.onclick = () => {


            cargarVista("dashboard.html");


        };


    }



}









// =====================
// CARGA INICIAL
// =====================


window.addEventListener("DOMContentLoaded",()=>{


    cargarVista("index.html");


});