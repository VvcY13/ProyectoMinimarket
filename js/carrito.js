let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const imgYape = document.querySelector("#img-yape");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.Imagen}" alt="${producto.Nombre}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.Nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>S/${producto.Precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>S/${producto.Precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.ID}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.iD === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
    total.innerText = `S/${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
async function comprarCarrito() {
    Swal.fire({
        title: 'Muchas Gracias por tu compra!',
        icon: 'success',
        html: 'No olvides recogerlo en tienda',
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Entendido'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
            /*try {
                const productosVendidos = [];

                for (const producto of productosEnCarrito) {
                    productosVendidos.push({
                        id: producto.ID,
                        cantidadVendida: producto.cantidad
                    });
                }

                const response = await fetch('controladorActualizarStock.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productos: productosVendidos })
                });*/

                try {
                    const datosCompra = {
                        total: totalCalculado, // Agregar el total de la compra
                        productos: []
                    };
            
                    for (const producto of productosEnCarrito) {
                        datosCompra.productos.push({
                            id: producto.ID,
                            cantidadVendida: producto.cantidad
                        });
                    }
            
                    const response = await fetch('controladorActualizarStock.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosCompra)
                    });

                if (response.ok) {
                    productosEnCarrito.length = 0;
                    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

                    // Actualizar la interfaz: deshabilitar secciones y mostrar mensaje de compra exitosa
                    contenedorCarritoVacio.classList.add("disabled");
                    contenedorCarritoProductos.classList.add("disabled");
                    contenedorCarritoAcciones.classList.add("disabled");
                    contenedorCarritoComprado.classList.remove("disabled");
                    imgYape.classList.remove("disabled");
                } else {
                    console.error('Error al actualizar el stock.');
                    // Manejar errores si la actualización del stock falla
                }
            } catch (error) {
                console.error('Error:', error);
                // Manejar errores si la solicitud falla
            }
        }
    });
}
