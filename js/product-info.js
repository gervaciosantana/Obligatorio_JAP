var arrayProducts = {};
var arrayComments = {};

function showProductImages(array){    //Funcion para mostrar las imagenes del producto

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById('productImages').innerHTML = htmlContentToAppend;
    }
}

function showComments(){    //Funcion para mostrar los comentarios
    let userComment = "";

    for (let i = 0; i < arrayComments.length; i++) {
        let commentData = arrayComments[i];
    
        userComment += 
        '<p><b>' + commentData.user + '</b></p>' + 
        '<p>' + commentData.description + '</p>' + 
        '<p>' + ratingProduct(commentData.score) + '</p>' + 
        '<p>Fecha: ' + commentData.dateTime + '</p><hr>' ;
      
    }
    
      document.getElementById('comments').innerHTML = userComment; 

}

function ratingProduct(starScore){  //Funcion para colocar el rating con estrellas
    let starsRating = ""
    
    for (let i = 1 ; i <= 5 ; i++){
        if(i <= starScore) {
            starsRating += '<span class="fa fa-star checked"></span>';
        }
        else {
            starsRating += '<span class="fa fa-star"></span>';
        }
    }
    return starsRating
}

function saveComment() {
    let textComment = document.getElementById('commentText').value; //Obtengo el elemento textArea
  
    if(textComment != ''){ //Si el texto no esta vacio...
        
      let commentDataObj = {                      //creo un objeto con el mensaje y la fecha
        dateTime: new Date().toLocaleString(),    //guardo fecha y hora del comentario
        description: textComment ,                //obtener el mensaje del textarea
        user: localStorage.getItem('userEmail'),  //obtengo el usuario del localstorage
        score: document.querySelector('input[name="ratingValue"]:checked').value, //obtengo el rating marcado
      };
      
      arrayComments.push(commentDataObj); //Agregar el comentario al array que los contiene
      
      showComments();
    } 
    else {
      alert('No puede realizar comentarios vacios');
    }
      
    document.getElementById('formComment').reset();  //Para vaciar el textarea una vez hecho el comentario
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            arrayProducts = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount")
        
            productNameHTML.innerHTML = arrayProducts.name;
            productDescriptionHTML.innerHTML = arrayProducts.description;
            productCostHTML.innerHTML = '<b>'+arrayProducts.currency+arrayProducts.cost+'</b>';
            productCategoryHTML.innerHTML = arrayProducts.category;
            productSoldCountHTML.innerHTML = arrayProducts.soldCount;

            showProductImages(arrayProducts.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultJSON){
        if (resultJSON.status === "ok")
        {
            arrayComments = resultJSON.data

            
           showComments()
        }
    });

});