//Funcion para no dejar campos vacios
function validarDatos(){
    let user = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    if((user !=="") && (password !== "")){
        setUser();
        window.location.href="home.html";
    }
    else{
        alert("Debe completar los campos vacios")
    }
}

//Funcion para guardar los datos ingresados en el login
function setUser(){
    let userName = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    localStorage.setItem("userPassword", password);
    localStorage.setItem("userName",userName);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});