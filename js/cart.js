const URLcart = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cartProducts = [];
var totalValue = 0;
var finalPrice = 0;
var valorDeEnvio = 0;
var formaDePago = "";
var infoOK = true;

function showCartProducts() {           //Funcion para generar HTML de cada producto

    let htmlContentToShow2 = "";
    let i = 0;
    for (let articles of cartProducts) {
        htmlContentToShow2 += `
        <tr>
        <td><img src="${articles.src}" class="img-fluid rounded" style ="max-width:55px !important"></td>
        <td>${articles.name}</td>
        <td>${articles.currency} ${articles.unitCost}</td>
        <td><input class="form-control" style="max-width: 4em;" type="number" id="${i}" min="1" onkeyup="if(this.value<0){this.value= this.value * -1}" value=${articles.count} onchange="updateProductsSubtotals(this.value, ${articles.unitCost}, ${i})"></td>
        <td><span id="currency${i}">${articles.currency}</span><span id="subtotal${i}">${articles.unitCost * articles.count}</span></td>
        <td><button type="button" class="close" aria-label="Close" onclick="deleteItem(${i})"> <span aria-hidden="true">&times;</span> </button></td>
        </tr>
        `
        i++;
    };

    document.getElementById("prodEnCarrito").innerHTML = htmlContentToShow2;
    updateTotal();
    shippingCostAndFinalPrice();


};


function updateTotal() {                                                  //Funcion para actulizar el total
    let totalValue = 0;

    for (let i = 0; i < cartProducts.length; i++) {

        let prodSubtotal = parseFloat(document.getElementById(`subtotal${i}`).innerHTML)

        totalValue += parseFloat(changeCurrency(prodSubtotal, i))

    };

    document.getElementById(`total`).innerHTML = totalValue;

};

function changeCurrency(subtotal, id) {                                   //Funcion para convertir de USD a UYU  (1 USD = 40 UYU)
    let currency = document.getElementById(`currency${id}`).innerHTML
    if (currency == "USD") {
        return subtotal * 40;
    }
    else {
        return subtotal;
    }
};


function updateProductsSubtotals(cant, unitCost, id) {         //Funcion para actulizar el valor del subtotal y total de acuerdo a la cantidad
    let subtotal = cant * unitCost;


    document.getElementById(`subtotal${id}`).innerHTML = subtotal
    updateTotal();
    shippingCostAndFinalPrice();
}



function shippingCostAndFinalPrice() {                                        //Funcion para calcular el costo de envio y el precio final
    tipoDeEnvio = document.getElementById('metodoDeEnvio').value;
    let subtotal = parseInt(document.getElementById('total').innerHTML);

    switch (tipoDeEnvio) {
        case "premium":
            valorDeEnvio = parseInt(subtotal * 0.15)
            document.getElementById('costoDeEnvio').innerHTML = valorDeEnvio
            document.getElementById('precioFinal').innerHTML = subtotal + valorDeEnvio;
            break;

        case "express":
            valorDeEnvio = parseInt(subtotal * 0.07)
            document.getElementById('costoDeEnvio').innerHTML = valorDeEnvio
            document.getElementById('precioFinal').innerHTML = subtotal + valorDeEnvio;
            break;

        case "standard":
            valorDeEnvio = parseInt(subtotal * 0.05)
            document.getElementById('costoDeEnvio').innerHTML = valorDeEnvio
            document.getElementById('precioFinal').innerHTML = subtotal + valorDeEnvio;
            break;

        default:
            valorDeEnvio = 0
            document.getElementById('costoDeEnvio').innerHTML = valorDeEnvio
            document.getElementById('precioFinal').innerHTML = subtotal + valorDeEnvio;
            break;
    }


};


function validatePayment() {                              //Funcion para validar los campos presentes en el metodo de pago

    if (formaDePago === "credito") {
        let cardName = document.getElementById('cardName');
        let cardNumber = document.getElementById('cardNumber');
        let safeCode = document.getElementById('code');
        let expDate = document.getElementById('expDate');

        if (cardName.value === "" || cardName.value === null) {
            cardName.classList.add('is-invalid');
            infoOK = false;
            document.getElementById('saveButton').removeAttribute("data-dismiss")
        };

        if (cardName.value !== "" & cardName.value !== null) {
            cardName.classList.remove('is-invalid')
            infoOK = true;
            document.getElementById('saveButton').setAttribute("data-dismiss", "modal")
            
        };

        if (cardNumber.value === "" || cardNumber.value === null) {
            cardNumber.classList.add('is-invalid');
            infoOK = false;
            document.getElementById('saveButton').removeAttribute("data-dismiss")
        };

        if (cardNumber.value !== "" & cardNumber.value !== null) {
            cardNumber.classList.remove('is-invalid')
            infoOK = true;
            document.getElementById('saveButton').setAttribute("data-dismiss", "modal")
        };

        if (safeCode.value === "" || safeCode.value === null) {
            safeCode.classList.add('is-invalid');
            infoOK = false;
            document.getElementById('saveButton').removeAttribute("data-dismiss")
        };

        if (safeCode.value !== "" & safeCode.value !== null) {
            safeCode.classList.remove('is-invalid')
            infoOK = true;
            document.getElementById('saveButton').setAttribute("data-dismiss", "modal")
        };

        if (expDate.value === "" || expDate.value === null) {
            expDate.classList.add('is-invalid');
            infoOK = false;
            document.getElementById('saveButton').removeAttribute("data-dismiss")
        };

        if (expDate.value !== "" & expDate.value !== null) {
            expDate.classList.remove('is-invalid')
            infoOK = true;
            document.getElementById('saveButton').setAttribute("data-dismiss", "modal")
        };

    };

    if (formaDePago === "transferencia") {

        let accountNumber = document.getElementById('accountNumber');

        if (accountNumber.value === "" || accountNumber.value === null) {
            accountNumber.classList.add('is-invalid');
            infoOK = false;
            document.getElementById('saveButton').removeAttribute("data-dismiss")
        };

        if (accountNumber.value !== "" & accountNumber.value !== null) {
            accountNumber.classList.remove('is-invalid')
            infoOK = true;
            document.getElementById('saveButton').setAttribute("data-dismiss", "modal")
        };
    };


    if (formaDePago === "" || formaDePago === null) {

        let alert =
            `<div class="alert alert-warning fade show" >
            Debe seleccionar una metodo de pago!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
            </div>`

        document.getElementById(`alertaPago`).innerHTML = alert
        document.getElementById('saveButton').removeAttribute("data-dismiss")
        infoOK = false;
    };

};



function deleteItem(id) {                //Funcion para eliminar elementos del carrito    
    
    cartProducts.splice(id, 1);

    showCartProducts();
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(URLcart).then(resultObj => {        //Obtengo los productos que estan en el carrito
        cartProducts = resultObj.data.articles;
        showCartProducts();

    });


    var allData = document.getElementById('allData');

    allData.addEventListener('submit', function (e) {                    

        validatePayment();

        let direccion = document.getElementById('direccion');
        let pais = document.getElementById('pais');


        if (direccion.value === "" || direccion.value === null) {
            direccion.classList.add('is-invalid');
            infoOK = false;
        };

        if (direccion.value !== "" & direccion.value !== null) {
            direccion.classList.remove('is-invalid');
        };

        if (pais.value === "" || pais.value === null) {
            pais.classList.add('is-invalid');
            infoOK = false;
        };

        if (pais.value !== "" & pais.value !== null) {
            pais.classList.remove('is-invalid');
        };

        if (infoOK === false) {
            e.preventDefault();
        };

        if (infoOK === true) {

            getJSONData(CART_BUY_URL).then(function (resultObj) {

                let alertToShowHTML = "";

                if (resultObj.status === 'ok') {
                    alertToShowHTML = resultObj.data.msg;
                }
                else if (resultObj.status === 'error') {
                    alertToShowHTML = "Ha habido un error :(, revisa tus datos.";
                }

                document.getElementById("alertaOK").innerHTML = 
                `<div class="alert alert-success fade show">${alertToShowHTML}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> 
                </button>
                </div>`;
            });
            e.preventDefault();

        };
    });

});

document.querySelectorAll('input[name="formaDePago"]').forEach((elem) => {             //Obtengo los inputs de la forma de pago
    elem.addEventListener("change", function (e) {
        formaDePago = e.target.value;

        if (formaDePago === "credito") {

            document.getElementById('accountNumber').setAttribute('disabled', true);

            document.getElementById('cardName').removeAttribute('disabled', true);
            document.getElementById('cardNumber').removeAttribute('disabled', true);
            document.getElementById('code').removeAttribute('disabled', true);
            document.getElementById('expDate').removeAttribute('disabled', true);

            document.getElementById('accountNumber').classList.remove('is-invalid');

        };

        if (formaDePago === "transferencia") {

            document.getElementById('cardName').setAttribute('disabled', true);
            document.getElementById('cardNumber').setAttribute('disabled', true);
            document.getElementById('code').setAttribute('disabled', true);
            document.getElementById('expDate').setAttribute('disabled', true);

            document.getElementById('accountNumber').removeAttribute('disabled', true);

            document.getElementById('cardName').classList.remove('is-invalid');
            document.getElementById('cardNumber').classList.remove('is-invalid');
            document.getElementById('code').classList.remove('is-invalid');
            document.getElementById('expDate').classList.remove('is-invalid');

        };

    });

});