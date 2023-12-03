<?php

include 'controladorConexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$conexion = conectar();

if (isset($data['total'])) {
    $totalCompra = $data['total'];
   
    $sqlNuevaCompra = "INSERT INTO compras (FechaCompra, Estado, Total) VALUES (NOW(), 'pendiente', $totalCompra)";

    if ($conexion->query($sqlNuevaCompra) !== TRUE) {
        echo "Error al crear una nueva compra: " . $conexion->error;
        exit();
    }

    $idCompra = $conexion->insert_id;

    foreach ($data['productos'] as $producto) {
        $idProducto = $producto['id'];
        $cantidadVendida = $producto['cantidadVendida'];
        $preciosinigv= $producto['preciosinigv'];

        $sqlProducto = "SELECT Nombre, Precio, Cantidad, precioSinIGV FROM tblproductos WHERE id = $idProducto";
        $resultProducto = $conexion->query($sqlProducto);

        if ($resultProducto->num_rows > 0) {
            $rowProducto = $resultProducto->fetch_assoc();
            $nombreProducto = $rowProducto['Nombre'];
            $precioProducto = $rowProducto['Precio'];
            $stockActual = $rowProducto['Cantidad'];
            $sinigv = $rowProducto['precioSinIGV'];

            if ($cantidadVendida > $stockActual) {
                echo "No hay suficiente stock para el producto con ID $idProducto.";
                exit();
            }

            $nuevoStock = $stockActual - $cantidadVendida;
            $sqlUpdateStock = "UPDATE tblproductos SET Cantidad = $nuevoStock WHERE id = $idProducto";

            if ($conexion->query($sqlUpdateStock) !== TRUE) {
                echo "Error al actualizar el stock del producto con ID $idProducto: " . $conexion->error;
                exit();
            }
            $nuevaCantidadVendida=intval($cantidadVendida);
            $nuevosinigv=floatval($sinigv);
            $nuevovalor= $nuevaCantidadVendida*$nuevosinigv;

            $sqlInsertCompraProducto = "INSERT INTO productos_comprados (idCompra, Producto, Cantidad, Precio, sinIGV) VALUES ($idCompra, '$nombreProducto', $cantidadVendida, $precioProducto, $nuevovalor)";

            if ($conexion->query($sqlInsertCompraProducto) !== TRUE) {
                echo "Error al registrar la compra del producto con ID $idProducto: " . $conexion->error;
                exit();
            }
        } else {
            echo "Producto con ID $idProducto no encontrado.";
            exit();
        }
    }
  
} else {
    echo "No se recibió el total de la compra.";
    exit();
}

$conexion->close();

?>