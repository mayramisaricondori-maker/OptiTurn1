const eye1 = document.getElementById("eye1");
const eye2 = document.getElementById("eye2");

if(eye1){

    eye1.onclick=()=>{

        const pass=document.getElementById("pass1");

        if(pass.type=="password"){

            pass.type="text";

            eye1.classList.replace("fa-eye","fa-eye-slash");

        }else{

            pass.type="password";

            eye1.classList.replace("fa-eye-slash","fa-eye");

        }

    }

}

if(eye2){

    eye2.onclick=()=>{

        const pass=document.getElementById("pass2");

        if(pass.type=="password"){

            pass.type="text";

            eye2.classList.replace("fa-eye","fa-eye-slash");

        }else{

            pass.type="password";

            eye2.classList.replace("fa-eye-slash","fa-eye");

        }

    }

}