<?php
include 'controladorConexion.php';

$conexion = conectar();

$sqlVentasProductos = "SELECT c.idCompras AS idCompras, c.FechaCompra,c.Total ,c.Estado, pc.Producto, pc.Cantidad, pc.Precio, pc.sinIGV
                    FROM compras c
                    INNER JOIN productos_comprados pc ON c.idCompras = pc.idCompra";

$resultado = $conexion->query($sqlVentasProductos);

if ($resultado && $resultado->num_rows > 0) {
    $ventas = array();

    while ($fila = $resultado->fetch_assoc()) {
        $idCompra = $fila["idCompras"];

        if (!isset($ventas[$idCompra])) {
            $ventas[$idCompra] = array(
                "ID Compra" => $idCompra,
                "Fecha de Compra" => $fila["FechaCompra"],
                "Total"=>$fila["Total"],
                "Estado" => $fila["Estado"],
                "Detalles" => array()
            );
        }

        $detalleProducto = array(
            "Nombre Producto" => $fila["Producto"],
            "Cantidad" => $fila["Cantidad"],
            "Precio Unitario" => $fila["Precio"],
            "sinIGV" => $fila["sinIGV"]
        );

        $ventas[$idCompra]["Detalles"][] = $detalleProducto;
    }

    $ventasJson = json_encode(array_values($ventas));

    header('Content-Type: application/json');
    echo $ventasJson;
} else {
    echo json_encode(array("message" => "No se encontraron ventas."));
}

$conexion->close();


?>

