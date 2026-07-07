const app = document.getElementById("app");

async function cargarVista(vista){

    const respuesta = await fetch(`views/${vista}`);

    const html = await respuesta.text();

    app.innerHTML = html;

}