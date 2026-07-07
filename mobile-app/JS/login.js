const ojo = document.getElementById("eye");

if(ojo){

ojo.addEventListener("click",()=>{

const pass=document.getElementById("password");

if(pass.type=="password"){

pass.type="text";

ojo.innerHTML="🙈";

}else{

pass.type="password";

ojo.innerHTML="👁";

}

});

}