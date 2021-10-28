const URLcart = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cartProducts = [];
var subtotalesArray = [];
var totalValue = 0;


function showCartProducts() {           //Funcion para generar HTML de cada producto

    let htmlContentToShow2 = "";
    let i = 0;
    for (let articles of cartProducts) {
        htmlContentToShow2 += `
        <tr>
        <td><img src="${articles.src}" class="img-fluid rounded" style ="max-width:55px !important"></td>
        <td>${articles.name}</td>
        <td>${articles.currency} ${articles.unitCost}</td>
        <td><input class="form-control" style="max-width: 4em;" type="number" id="${i}" min=1 value=${articles.count} onchange="updateProductsSubtotals(this.value, ${articles.unitCost}, ${i})"></td>
        <td><span id="currency${i}">${articles.currency}</span><span id="subtotal${i}">${articles.unitCost * articles.count}</span></td>
        <td><button type="button" class="close" aria-label="Close" onclick=""> <span aria-hidden="true">&times;</span> </button></td>
        </tr>
        `
        i++;
    };

    document.getElementById("prodEnCarrito").innerHTML = htmlContentToShow2;
    updateTotal();


};


function updateTotal() {                                                  //Funcion para actulizar el total
    let totalValue = 0;

    for (let i = 0; i < cartProducts.length; i++) {

        let prodSubtotal = parseFloat(document.getElementById(`subtotal${i}`).innerHTML)

        totalValue += parseFloat(changeCurrency(prodSubtotal, i))

    }

    document.getElementById(`total`).innerHTML = 'Total: UYU' + totalValue;

}

function changeCurrency(subtotal, id) {                                   //Funcion para convertir de USD a UYU  (1 USD = 40 UYU)
    let currency = document.getElementById(`currency${id}`).innerHTML
    if (currency == "USD") {
        return subtotal * 40;
    }
    else {
        return subtotal;
    }
}


function updateProductsSubtotals(cant, unitCost, id) {         //Funcion para actulizar el valor del subtotal y total de acuerdo a la cantidad
    let subtotal = cant * unitCost;


    document.getElementById(`subtotal${id}`).innerHTML = subtotal
    updateTotal();
}



function showShippingCost() {


};


function deleteItem(){

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(URLcart).then(resultObj => {        //Obtengo los productos que estan en el carrito
        cartProducts = resultObj.data.articles;
        showCartProducts();
    });

});