function iniciarRegistro() {
    const camposPassword = document.querySelectorAll(".signup-password");

    camposPassword.forEach((contenedor) => {
        const input = contenedor.querySelector("input");
        const icono = contenedor.querySelector("i");

        if (!input || !icono) return;

        icono.onclick = () => {
            const oculto = input.type === "password";

            input.type = oculto ? "text" : "password";
            icono.classList.toggle("fa-eye", !oculto);
            icono.classList.toggle("fa-eye-slash", oculto);
        };
    });
}

window.iniciarRegistro = iniciarRegistro;