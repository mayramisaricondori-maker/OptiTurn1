document.addEventListener("DOMContentLoaded",()=>{


const btn = document.getElementById(
"btnVolverDashboard"
);


if(btn){

btn.onclick=()=>{

cargarVista("dashboard.html");

};

}


});
document.addEventListener("DOMContentLoaded",()=>{


const cerrar = document.getElementById("btnCerrarSesion");


if(cerrar){


cerrar.onclick = ()=>{


cargarVista("login.html");


};


}


});



if(btnCerrar){


btnCerrar.onclick = ()=>{


cargarVista("login.html");


};


};