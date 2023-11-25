<?php
include "controladorConexion.php";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $idProducto = $_POST["idProducto"];
    $agregarStock = isset($_POST["txtagregarStock"]) ? intval($_POST["txtagregarStock"]) : 0;
    $retirarStock = isset($_POST["txtretirarStock"]) ? intval($_POST["txtretirarStock"]) : 0;

    $conexion = conectar();
   
    $consultaCantidad = "SELECT Cantidad FROM tblproductos WHERE ID = $idProducto";
    $resultadoConsulta = $conexion->query($consultaCantidad);

    if ($resultadoConsulta->num_rows > 0) {
        $fila = $resultadoConsulta->fetch_assoc();
        $cantidadActual = intval($fila["Cantidad"]); 

        
        $nuevaCantidad = $cantidadActual + $agregarStock - $retirarStock;

        
        if ($nuevaCantidad < 0) {
            echo "No se puede retirar más de la cantidad actual.";
            exit();
        }

       
        $sql = "UPDATE tblproductos SET Cantidad = $nuevaCantidad WHERE ID = $idProducto";

        if ($conexion->query($sql) === TRUE) {
            
            header("Location: almacen.php");
            exit();
        } else {
            echo "Error al actualizar el stock: " . $conexion->error;
        }
    } else {
        echo "No se encontró el producto.";
    }

    $conexion->close();
}
?>