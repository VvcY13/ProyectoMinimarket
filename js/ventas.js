
// Select the container where the sales will be displayed
const contenedorVentas = document.querySelector("#contenedor-ventas");

// Fetch the sales data from the server
fetch("controladorObtenerVentas.php")
 .then(response => response.json())
 .then(data => {
    ventas = data;
    cargarVentas(ventas);
 })
 .catch(error => {
    console.error("Error al obtener las ventas:", error);
 });

// Function to display the sales data in the container
function cargarVentas(ventas) {
    contenedorVentas.innerHTML = "";

    ventas.forEach(venta => {
        const div = document.createElement("div");
        div.classList.add("venta");
        div.innerHTML = `
            <div class="venta-detalles">
                <h3 class="venta-titulo">Id de Venta:${venta["ID Compra"]}</h3>
                <p class="venta-fecha">Fecha: ${venta["Fecha de Compra"]}</p>
                <p class="venta-total">Total: ${venta["Total"]}</p>
                <p class="venta-estado">Estatus ${venta["Estado"]}</p>
                <button class="producto-cambiar-estatus" id="CambiarEstatus-${venta["ID Compra"]}">Cambiar Estatus</button>
                <button class="producto-editar-stock" id="detalle-${venta["ID Compra"]}">Mostrar Detalles</button>
                <div class="detalles-productos" id="detalles-${venta["ID Compra"]}">
                   
                </div>
            </div>
        `;
        contenedorVentas.append(div);

        const botonMostrarDetalles = div.querySelector(`#detalle-${venta["ID Compra"]}`);
        botonMostrarDetalles.addEventListener("click", () => toggleDetalles(venta));
        const botonCambiarEstatus = div.querySelector(`#CambiarEstatus-${venta["ID Compra"]}`);
        botonCambiarEstatus.addEventListener("click", () => cambiarEstatus(venta));
    });

    }


function toggleDetalles(venta) {
    /*const detallesProductos = document.querySelector(`#detalles-${venta["ID Compra"]}`);

    if (detallesProductos.classList.contains("mostrando-detalles")) {
        detallesProductos.innerHTML = "";
        detallesProductos.classList.remove("mostrando-detalles");
    } else {
        detallesProductos.innerHTML = "";

        venta["Detalles"].forEach(detalle => {
            const detalleDiv = document.createElement("div");
            detalleDiv.classList.add("detalle-producto");
            detalleDiv.innerHTML = `
                <p class="nombre-producto">Producto: ${detalle["Nombre Producto"]}</p>
                <p class="cantidad">Cantidad: ${detalle["Cantidad"]}</p>
                <p class="precio">Precio Unit: ${detalle["Precio Unitario"]}</p>
                <hr>
            `;
            detallesProductos.append(detalleDiv);
        });

        detallesProductos.classList.add("mostrando-detalles");
    }*/

    const detallesVentaModal = document.getElementById('detallesVentaModal');
    const modalDetalles = document.getElementById('modalDetalles');

    if (modalDetalles.style.display === 'block') {
        modalDetalles.style.display = 'none';
    } else {
        detallesVentaModal.innerHTML = ''; // Limpiar detalles anteriores

        venta["Detalles"].forEach(detalle => {
            // Crea el HTML para cada detalle y añádelo al modal
            const detalleHTML = `
                <p>Producto: ${detalle["Nombre Producto"]}</p>
                <p>Cantidad: ${detalle["Cantidad"]}</p>
                <p>Precio Unitario: ${detalle["Precio Unitario"]}</p>
                <hr>
            `;
            detallesVentaModal.insertAdjacentHTML('beforeend', detalleHTML);
        });

        modalDetalles.style.display = 'block';
    }

}


function cerrarModal() {
    const modalDetalles = document.getElementById('modalDetalles');
    modalDetalles.style.display = 'none';
}








function cambiarEstatus(venta){
    const idVenta = venta["ID Compra"];
    fetch("controladorEstatus.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `IDCompra=${idVenta}` 
    })
    .then(response => {
        if (response.ok) {
            console.log("Estatus cambiado correctamente");
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            console.error("Error al cambiar el estatus");
        }
    })
    .catch(error => {
        console.error("Error al intentar cambiar el estatus:", error);
    });
}
