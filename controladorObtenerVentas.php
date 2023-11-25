<?php
/*
include 'controladorConexion.php';

$conexion = conectar();

// Consulta para obtener las ventas con sus productos asociados
$sqlVentasProductos = "SELECT c.idCompras AS idCompras, c.FechaCompra, c.Estado, pc.Producto, pc.Cantidad, pc.Precio
                    FROM compras c
                    INNER JOIN productos_comprados pc ON c.idCompras = pc.idCompra;";

$resultado = $conexion->query($sqlVentasProductos);

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "ID Compra: " . $fila["idCompras"] . "<br>";
        echo "Fecha de Compra: " . $fila["FechaCompra"] . "<br>";
        echo "Estado: " . $fila["Estado"] . "<br>";
        echo "Nombre Producto: " . $fila["Producto"] . "<br>";
        echo "Cantidad: " . $fila["Cantidad"] . "<br>";
        echo "Precio Unitario: " . $fila["Precio"] . "<br>";
        echo "--------------------------------------<br>";
    }
} else {
    echo "No se encontraron ventas.";
}

$conexion->close();
*/


/*include 'controladorConexion.php';

$conexion = conectar();

// Consulta para obtener las ventas con sus productos asociados
$sqlVentasProductos = "SELECT c.idCompras AS idCompras, c.FechaCompra, c.Estado, pc.Producto, pc.Cantidad, pc.Precio
                    FROM compras c
                    INNER JOIN productos_comprados pc ON c.idCompras = pc.idCompra";

$resultado = $conexion->query($sqlVentasProductos);

if ($resultado && $resultado->num_rows > 0) {
    // Array para almacenar las ventas y sus detalles
    $ventas = array();

    // Recorrer los resultados y agrupar por ID de compra
    while ($fila = $resultado->fetch_assoc()) {
        $idCompra = $fila["idCompras"];

        // Si la venta aún no está en el array, agregarla
        if (!isset($ventas[$idCompra])) {
            $ventas[$idCompra] = array(
                "ID Compra" => $idCompra,
                "Fecha de Compra" => $fila["FechaCompra"],
                "Estado" => $fila["Estado"],
                "Detalles" => array()
            );
        }

        // Detalles de cada producto asociado a la compra
        $detalleProducto = array(
            "Nombre Producto" => $fila["Producto"],
            "Cantidad" => $fila["Cantidad"],
            "Precio Unitario" => $fila["Precio"]
        );

        // Agregar el detalle del producto a la venta correspondiente
        $ventas[$idCompra]["Detalles"][] = $detalleProducto;
    }

    // Mostrar las ventas con sus detalles
    foreach ($ventas as $venta) {
        echo "ID Compra: " . $venta["ID Compra"] . "<br>";
        echo "Fecha de Compra: " . $venta["Fecha de Compra"] . "<br>";
        echo "Estado: " . $venta["Estado"] . "<br>";

        // Mostrar detalles de cada producto asociado a la compra
        foreach ($venta["Detalles"] as $detalle) {
            echo "Nombre Producto: " . $detalle["Nombre Producto"] . "<br>";
            echo "Cantidad: " . $detalle["Cantidad"] . "<br>";
            echo "Precio Unitario: " . $detalle["Precio Unitario"] . "<br>";
            echo "--------------------------------------<br>";
        }
    }
} else {
    echo "No se encontraron ventas.";
}

$conexion->close();

*/

include 'controladorConexion.php';

$conexion = conectar();

$sqlVentasProductos = "SELECT c.idCompras AS idCompras, c.FechaCompra,c.Total ,c.Estado, pc.Producto, pc.Cantidad, pc.Precio
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
            "Precio Unitario" => $fila["Precio"]
        );

        $ventas[$idCompra]["Detalles"][] = $detalleProducto;
    }

    // Convertir el array de ventas a JSON
    $ventasJson = json_encode(array_values($ventas));

    // Devolver los datos de ventas como JSON
    header('Content-Type: application/json');
    echo $ventasJson;
} else {
    echo json_encode(array("message" => "No se encontraron ventas."));
}

$conexion->close();


?>

