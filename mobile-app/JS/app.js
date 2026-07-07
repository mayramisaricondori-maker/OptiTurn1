window.onload = () => {

    cargarVista("splash.html");

    setTimeout(() => {

        const boton = document.getElementById("btnComenzar");

        if (boton) {

            boton.onclick = () => {

                cargarVista("login.html");

            };

        }

    },100);

};
window.onload=()=>{

cargarVista("login.html");

}

window.onload=()=>{

cargarVista("splash.html");

setTimeout(()=>{

cargarVista("login.html");

},2500);

}