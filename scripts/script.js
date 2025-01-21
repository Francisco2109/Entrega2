// Variables y Clases
class Produto{
    constructor(id, nombre, precio, cantidad, ){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.cantidad = cantidad
    }
}

const doc = document;
let raizCatalogo = doc.querySelector(".productos-lista")
let raizCarrito = doc.querySelector(".carrito-items")
let precioTotal = document.querySelector(".precio-total");
let contadorProductosCarrito = document.querySelector(".count-product");
let productosEnCarrito = [];
let precioTotalAcumulador = 0;
let contadorProductos = 0;

console.log(raizCatalogo)
console.log(raizCatalogo.length)
console.log(raizCarrito)
console.log(raizCarrito.length)


const Productos = [
    {id: 0, nombre: "teclado gamer1", precio: 1800, cantidad: 3},
    {id: 1, nombre: "teclado gamer2", precio: 3000, cantidad: 5},
    {id: 2, nombre: "teclado gamer3", precio: 1800, cantidad: 3},
    {id: 3, nombre: "teclado gamer4", precio: 1800, cantidad: 3},
    {id: 4, nombre: "teclado gamer5", precio: 1800, cantidad: 3},
    {id: 5, nombre: "teclado gamer6", precio: 1800, cantidad: 3},
    {id: 6, nombre: "teclado gamer7", precio: 1800, cantidad: 3},
    {id: 7, nombre: "teclado gamer8", precio: 1800, cantidad: 3},
    {id: 8, nombre: "teclado gamer9", precio: 1800, cantidad: 3},
    {id: 9, nombre: "teclado gamer10", precio: 1800, cantidad: 3}
]
// Carga de Datos
function cargarProductos() {
    const listaDeProductos = doc.querySelector(".productos-container");
    let indice = 0;
    Productos.forEach(producto => {
        if (indice < Productos.length) {
                let item = doc.createElement("div");
                item.innerHTML = `
                    <div class="card">
                        <div>
                            <img src="imagenes/generico.png" class="img">
                        </div>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-precio">$${producto.precio}</p>
                        <p class="card-cant">Disponibles: ${producto.cantidad} unidades</p>
                        <a href="" data-id="${producto.id}" class="btn-compra">Agregar al Carrito</a>
                    </div>
                `;

                listaDeProductos.appendChild(item);
                indice ++
            }
        }
    )
}


// Funciones display
function abrirCarrito(){
    if ((doc.getElementById("productos-car").style.display) == "block" ){
        doc.getElementById("productos-car").style.display = "none";
    }
    else{
        doc.getElementById("productos-car").style.display = "block";
    }
}
function bienvenido(){
    alert("Bienvenido! Tenemos Ofertas en Fernet para el este caluroso Finde!")
}
// Inicializar el Script
cargarProductos()

// Eventos
detectarEvento();
function detectarEvento(){
    raizCatalogo.addEventListener("click", aggProducto);
    raizCarrito.addEventListener("click", delProducto);
}
function aggProducto(e) {
    if (e.target.classList.contains("btn-compra")) {
        const productoSeleccionado = e.target.parentElement; 
        leerHTML(productoSeleccionado);
    }
}

function delProducto(e) {
    if (e.target.classList.contains("btn-del")) {
        const borrarId = e.target.getAttribute("data-id");

        productosEnCarrito.forEach(value => {
            if (value.id == borrarId) {
                let reducirPrecio = parseFloat(value.precio) * parseFloat(value.cant);
                precioTotalAcumulador =  precioTotalAcumulador - reducirPrecio;
                precioTotalAcumulador = precioTotalAcumulador.toFixed(2);
            }
        });

        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== borrarId);
        contadorProductos--;
    }

    if (productosEnCarrito.length === 0) {
        precioTotal.innerHTML = 0;
        contadorProductos.innerHTML = 0;
    }

    cargarCarrito();
}

function leerHTML(producto) {
    const infoProducto = {
        img: producto.querySelector("div img").src,
        nombre: producto.querySelector(".card-title").textContent,
        precio: producto.querySelector("div p span").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cant: 1
    }

    precioTotalAcumulador = parseFloat(precioTotalAcumulador) + parseFloat(infoProducto.precio);
    precioTotalAcumulador = precioTotalAcumulador.toFixed(2);

    const exist = productosEnCarrito.some(producto => producto.id === infoProducto.id);
    if (exist) {
        const pro = productosEnCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cant++;
                return producto;
            } else {
                return producto;
            }
        });
        productosEnCarrito = [...pro];
    } else {
        productosEnCarrito = [...productosEnCarrito, infoProducto];
        contadorProductos++;
    }

    cargarCarrito();
}

function cargarCarrito() {
    limpiarCarrito();
    productosEnCarrito.forEach(producto => {
        const { img, nombre, precio, id, cant } = producto;
        const itemCar = doc.createElement("div");
        itemCar.classList.add("item");
        itemCar.innerHTML = `
            <div class="carts">
            <img src="${img}">
            <div class="item-content">
                <h5>${nombre}</h5>
                <h5 class="cart-price">$${precio}</h5>
                <h6>Cantidad: ${cant}</h6>
            </div>
            <span class="btn-del" data-id="${id}">X</span>
            </div>
        `;
        raizCarrito.appendChild(itemCar);
    }
);

    precioTotal.innerHTML = precioTotalAcumulador;
    contadorProductosCarrito.innerHTML = contadorProductos;
}
function limpiarCarrito() {
    raizCarrito.innerHTML = "";
}