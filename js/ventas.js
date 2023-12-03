const contenedorVentas = document.querySelector("#contenedor-ventas");
fetch("controladorObtenerVentas.php")
 .then(response => response.json())
 .then(data => {
    ventas = data;
    cargarVentas(ventas);
 })
 .catch(error => {
    console.error("Error al obtener las ventas:", error);
 });

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
                <button class="producto-factura" id="factura-${venta["ID Compra"]}">Realizar Factura</button>
                <div class="detalles-productos" id="detalles-${venta["ID Compra"]}">
                   
                </div>
            </div>
        `;
        contenedorVentas.append(div);

        const botonMostrarDetalles = div.querySelector(`#detalle-${venta["ID Compra"]}`);
        botonMostrarDetalles.addEventListener("click", () => toggleDetalles(venta));
        const botonCambiarEstatus = div.querySelector(`#CambiarEstatus-${venta["ID Compra"]}`);
        botonCambiarEstatus.addEventListener("click", () => cambiarEstatus(venta));
        const botonGenerarFactura = div.querySelector(`#factura-${venta["ID Compra"]}`);
        botonGenerarFactura.addEventListener("click", ()=>generarFactura(venta));
    });

    }

function toggleDetalles(venta) {
    
    const detallesVentaModal = document.getElementById('detallesVentaModal');
    const modalDetalles = document.getElementById('modalDetalles');

    if (modalDetalles.style.display === 'block') {
        modalDetalles.style.display = 'none';
    } else {
        detallesVentaModal.innerHTML = ''; // Limpiar detalles anteriores

        venta["Detalles"].forEach(detalle => {
            
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
function generarFactura(venta){
    const idVenta = venta["ID Compra"];
    console.log("hizo click en generar factura para la venta "+ idVenta);

    // Puedes utilizar la información de 'venta' directamente para generar la factura
    const facturaData = {
        "ublVersion": "2.1",
        "tipoOperacion": "0101",
        "tipoDoc": "03",
        "serie": "B001",
        "correlativo": "1",
        "fechaEmision": "2021-01-27T00:00:00-05:00",
        "formaPago": {
            "moneda": "PEN",
            "tipo": "Contado"
        },
        "tipoMoneda": "PEN",
        "client": {
            "tipoDoc": "6",
            "numDoc": 20000000002,
            "rznSocial": "Cliente",
            "address": {
                "direccion": "CHORRILLOS",
                "provincia": "LIMA",
                "departamento": "LIMA",
                "distrito": "LIMA",
                "ubigueo": "150101"
            }
        },
        "company": {
            "ruc": 12345654321,
            "razonSocial": "Dtodo SA",
            "nombreComercial": "Dtodo SA",
            "address": {
                "direccion": "CHORRILLOS",
                "provincia": "LIMA",
                "departamento": "LIMA",
                "distrito": "LIMA",
                "ubigueo": "150101"
            }
        },
        "mtoOperGravadas": parseFloat(venta.Total)-(parseFloat(venta.Total)*0.18),
        "mtoIGV": parseFloat(venta.Total) * 0.18,
        "valorVenta": parseFloat(venta.Total),
        "totalImpuestos": parseFloat(venta.Total) * 0.18,
        "subTotal": parseFloat(venta.Total) * 1.18,
        "mtoImpVenta":parseFloat(venta.Total)-(parseFloat(venta.Total)*0.18)+parseFloat(venta.Total) * 0.18,
        "details": []
    };

    venta.Detalles.forEach(detalle => {
        const detalleProducto = {
            "codProducto": "", // Puedes asignar un código de producto si lo tienes
            "unidad": "UND",
            "descripcion": detalle["Nombre Producto"],
            "cantidad": parseFloat(detalle.Cantidad),
            "mtoValorUnitario": parseFloat(detalle["sinIGV"])/parseFloat(detalle.Cantidad),
            "mtoValorVenta": parseFloat(detalle["sinIGV"]),
            "mtoBaseIgv": parseFloat(detalle["Precio Unitario"]) * parseFloat(detalle.Cantidad),
            "porcentajeIgv": 18,
            "igv": parseFloat(detalle["Precio Unitario"]) * parseFloat(detalle.Cantidad) * 0.18,
            "tipAfeIgv": 10,
            "totalImpuestos": parseFloat(detalle["Precio Unitario"]) * parseFloat(detalle.Cantidad) * 0.18,
            "mtoPrecioUnitario": parseFloat(detalle["sinIGV"])/parseFloat(detalle.Cantidad),
        };
        facturaData.details.push(detalleProducto);
    });

    // Agregar leyenda
    facturaData.legends = [
        {
            "code": "1000",
            "value": "SOLES"
        }
    ];

    // Puedes utilizar facturaData para enviarlo a la API o realizar otras operaciones necesarias
    console.log("JSON para la factura:", facturaData);
    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDE1NjIxNjcsImV4cCI6MTcwMTY0ODU2Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidnZjYXljaG8ifQ.Y03xAQFo_99HIq1D0k2bc1vlY3dUN3ujbv5cpqmmQkaY_gbU_zy1M9JKR9Qrh9DOO5BA1VLeNzwS82vqVbRxIy_soR-Fg4VQ1fUojQeVF7j7RzwtOrQ3-lWsk3qLpLPQuVfDoTCNtn19mh5iwtgI0OkfkoK7c-p9WZD0dd9dgHZc0Ls0mnUtuoqwmrudnwkPgBplOlBQCGkVQoJzyA7wdDzilkRmrHLUC57KbVcckiNaF5dUM3kV6cmqvO_QczHZ7IYqSGlPJPBEcPCN40I3UAcq5Tk2Yii0S6qE-PJYKjGDFdVeo_U5-ub4_2ME5jxiChZtRpiUvJ4ZJZxKUkmuCGz8vyzCROC7D1xH0VBPP9qbYImUWhdezLLquPKwo6kRh2D9T-Ajytun_S1jQUadpLDD2ji24D1pHq0YG2c8NmkvfGGCcp99Afozu1ktZ7OHq8OKaehKBW8DpEPvaFT_Y-voQReBs2FNw8XNTQrFuZQQRUyKOsuLsxVBrgNQTObvMsnmuWjLkmMEOC78KbUAkG6c2enXy5Sc8hiLU1PoeeTP4ZKDOb07RL0GuXB7GmwzWc3S2u7NAh1lRoEPwfA1TbzlTUZPMuVNF0iJVa0H4GQjIzN2ffKn5acIQMHpwKXHvb9ltF7XI46tmdy7forsuVekP2lZ_oJlYQjIOgIX5L0";
    // Si deseas enviar este JSON a un servidor para generar la factura, puedes utilizar fetch()
    fetch('https://facturacion.apisperu.com/api/v1/invoice/pdf', { // Cambiar a la URL del endpoint que devuelve el PDF
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(facturaData),
            })
                .then(response => response.blob()) // Obtener la respuesta como un blob (archivo binario)
                .then(blob => {
                    // Crear un objeto URL para el blob y crear un enlace de descarga
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'factura.pdf'; // Nombre del archivo PDF
                    document.body.appendChild(a); // Agregar el enlace al cuerpo del documento
                    a.click(); // Simular clic en el enlace para iniciar la descarga
                    document.body.removeChild(a); // Eliminar el enlace del cuerpo del documento después de la descarga
                })
                .catch(error => console.error('Error:', error));
                
};
