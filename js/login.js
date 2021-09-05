//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validarDatos(){
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    if((email !=="") && (password !== "")){
        setUser();
        window.location.href="home.html";
    }
    else{
        alert("debe completar los campos")
    }
}

function setUser(){
    let email = document.getElementById("inputEmail").value;
    localStorage.setItem("userEmail",email);

}

document.addEventListener("DOMContentLoaded", function(e){

});