function saveProfile() {                                  //Funcion para guardar los datos ingresados en el perfil

    let usuario = document.getElementById(`user`).value
    let nombre = document.getElementById(`nombre`).value
    let apellido = document.getElementById('apellido').value
    let email = document.getElementById(`email`).value
    let telefono = document.getElementById(`telefono`).value
    let edad = document.getElementById(`nacimiento`).value
    let contraseña = document.getElementById(`password`).value
    let imagen = document.getElementById(`imgUser`).src
    
    let datos = {
        usuario,
        nombre,
        apellido,
        email,
        telefono,
        edad,
        contraseña,
        imagen,
    }

    /* Otra manera de guardar los datos
    let datos = {
        "nombre": nombre.value ,
        "apellido": apellido.value,
    }
    */

    localStorage.setItem("datosDePerfil", JSON.stringify(datos))
    changeUserName();
    changePassword();
    getUser();
    showAlert();

};

function changeUserName() {                                          //Funcion para cambiar el nombre de usuario desde Mi perfil
    let newUserName = document.getElementById(`user`).value
    if (newUserName != undefined && newUserName != "") {
        localStorage.setItem("userName", newUserName);
    };
};

function changePassword(){                                           //Funcion para cambiar contraseña desde Mi perfil
    let newPassword = document.getElementById(`password`).value;
    if(newPassword != undefined && newPassword !=""){
        localStorage.setItem("userPassword", newPassword);
    };
};

function showAlert() {                                            //Funcion para mostrar una alerta cuando se guardan los cambios
    let alert = `<div class="alert alert-success fade show" >
    Se han guardado correctamente
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span></button>
    </div>`

    document.getElementById(`alerta`).innerHTML = alert

};


function getProfile() {                                          //Funcion para obtener los datos del perfil
    let datos = JSON.parse(localStorage.getItem("datosDePerfil"))
    if (datos != null) {
        document.getElementById(`user`).value = localStorage.getItem("userName");
        document.getElementById(`nombre`).value = datos.nombre;
        document.getElementById(`apellido`).value = datos.apellido;
        document.getElementById(`email`).value = datos.email;
        document.getElementById(`telefono`).value = datos.telefono;
        document.getElementById(`nacimiento`).value = datos.edad;
        showAge();
        document.getElementById(`password`).value = localStorage.getItem("userPassword");
        document.getElementById(`imgUser`).src = datos.imagen;
    };
};

function showAge(){                                              //Funcion para calcular y mostrar la edad      (31557600000 cantidad de milisegundos que tiene un año)
    var añosHTML = "";
    var fechaNacimiento = document.getElementById(`nacimiento`).value;
    var cumple = +new Date(fechaNacimiento);  //Cambia el formato de la fecha que viene del input
    añosHTML = ~~((Date.now() - cumple) / (31557600000))+" años";
    document.getElementById(`cantAños`).innerHTML = añosHTML;
    
};


function saveNewImg() {                              //Funcion para guardar la imagen
    var preview = document.getElementById(`imgUser`);
    var file = document.getElementById(`inputImg`).files[0];
    var reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }

    reader.onloadend = function () {
        preview.src = reader.result;
    }

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getProfile();

});