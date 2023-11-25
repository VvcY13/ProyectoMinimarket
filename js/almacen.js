const contenedorProductos = document.querySelector("#contenedor-productos");

fetch("controladorProductos.php")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  })
  .catch(error => {
    console.error("Error al obtener los productos:", error);
  });


function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            </div>
            <div class="producto-detalles-admin">
                <h3 class="producto-titulo-admin">${producto.Nombre}</h3>
                <p class="producto-precio-admin">S/${producto.Precio}</p>
                <p class="producto-descripcion">${producto.Descripcion}</p>
                <p class="producto-stock">Stock ${producto.Cantidad}</p>
                <button class="producto-editar" id="${producto.ID}">Editar Producto</button>
                <button class="producto-editar-stock" id="${producto.ID}">Editar Stock</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-editar");
  botonEditarStock = document.querySelectorAll(".producto-editar-stock");

  botonesAgregar.forEach(boton => {
      boton.addEventListener("click", editarProducto);
  });
  console.log("Botones de agregar actualizados");

  botonEditarStock.forEach(boton =>{
    boton.addEventListener("click", editarStock);
  });
  console.log("Botones de editar el stock")
}

function editarProducto(e) {
  console.log("Se hizo clic en Editar Producto");
  const idProducto = e.currentTarget.id;
    const productoSeleccionado = productos.find(producto => producto.ID === idProducto);
    
    try {
        localStorage.setItem("productoAEditar", JSON.stringify(productoSeleccionado));
        window.location.href = "edicion_producto.html";
    } catch (error) {
        console.error("Error al intentar redirigir a edicion_producto.html:", error);
    }
}

function editarStock(e){
  console.log("se  hizo click en editar Stock")
  const idProducto = e.currentTarget.id;
    const productoSeleccionado = productos.find(producto=> producto.ID == idProducto);
    try {
      localStorage.setItem("stockAEditar", JSON.stringify(productoSeleccionado));
      window.location.href = "nuevoStock.html";
  } catch (error) {
      console.error("Error al intentar redirigir a edicion_producto.html:", error);
  }
}