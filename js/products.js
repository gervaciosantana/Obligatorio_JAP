const ORDER_ASC_BY_COST = "Menor precio";
const ORDER_DESC_BY_COST = "Mayor precio";
const ORDER_BY_SOLD_COUNT = "Vend.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//Funcion que toma un criterio de ordenamiento y una lista
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
            <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
              <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
              <h3 class="m-3">${product.name}</h3>
              <div class="card-body">
                <p class="card-text">${product.description}</p>
                <p class="card-text"><b>${product.currency}${product.cost}</b></p>
                <p class="card-text"><small class="text-muted">${product.soldCount} vendidos</small></p>
              </div>
            </a>
          </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }

}

//Funcion para ordenar y mostrar la lista de productos
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortMenor").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortMayor").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de cada producto.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });



});