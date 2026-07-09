document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Volver al Dashboard
    // ==========================

    const volver = document.getElementById("btnVolver");

    if (volver) {

        volver.addEventListener("click", () => {

            cargarVista("dashboard.html");

        });

    }


    // ==========================
    // Tarjeta "Cercanos a ti"
    // ==========================

    const tarjeta = document.getElementById("btnServicios");

    if (tarjeta) {

        tarjeta.addEventListener("click", () => {

            cargarVista("servicios.html");

        });

    }


    // ==========================
    // Texto "Ver todo"
    // ==========================

    const verTodo = document.querySelector(".nearby-header span");

    if (verTodo) {

        verTodo.addEventListener("click", (e) => {

            e.stopPropagation(); // Evita que también dispare el click de la tarjeta

            cargarVista("servicios.html");

        });

    }

});