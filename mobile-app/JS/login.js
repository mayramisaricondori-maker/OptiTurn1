function iniciarLogin() {
    const ojo = document.getElementById("eye");
    const password = document.getElementById("password");

    if (!ojo || !password) return;

    ojo.onclick = () => {
        const oculto = password.type === "password";

        password.type = oculto ? "text" : "password";
        ojo.classList.toggle("fa-eye", !oculto);
        ojo.classList.toggle("fa-eye-slash", oculto);
    };
}

window.iniciarLogin = iniciarLogin;