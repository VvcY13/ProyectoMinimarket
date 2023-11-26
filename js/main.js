document.addEventListener("DOMContentLoaded", () => {

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

fetch("controladorProductos.php")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  })
  .catch(error => {
    console.error("Error al obtener los productos:", error);
  });

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            fetch(`controladorProductos.php?Categoria=${e.currentTarget.id}`)
                .then(response => response.json())
                .then(data => {
                    cargarProductos(data); // Carga los productos filtrados por categoría
                    console.log(data)
                })
                .catch(error => {
                    console.error("Error al obtener los productos:", error);
                });
        } else {
            // Si se hace clic en "Ver todos", obtén todos los productos sin filtrar
            fetch("controladorProductos.php")
                .then(response => response.json())
                .then(data => {
                    cargarProductos(data); // Carga todos los productos
                })
                .catch(error => {
                    console.error("Error al obtener los productos:", error);
                });
            }
    });
});

function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.Imagen}" alt="${producto.Nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.Nombre}</h3>
                <p class="producto-precio">S/${producto.Precio}</p>
                <p class="producto-precio">${producto.Descripcion}</p>
                <p class="producto-stock">Stock ${producto.Cantidad}</p>
                <button class="producto-agregar" id="${producto.ID}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();

    
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
    console.log("Botones de agregar actualizados");
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem'
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.ID === idBoton);

    if(productosEnCarrito.some(producto => producto.ID === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.ID === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
});