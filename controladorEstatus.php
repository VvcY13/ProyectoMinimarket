<?php
include "controladorConexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["IDCompra"])) {
    
    $idVenta = $_POST["IDCompra"];
    $conexion = conectar();
    $sql = "UPDATE compras SET Estado = 'Listo' WHERE idCompras = $idVenta";
    if ($conexion->query($sql) === TRUE) {
        echo json_encode(array("message" => "Estatus cambiado correctamente"));
        exit();
    } else {
        echo json_encode(array("error" => "Error al cambiar el estatus"));
    }
} else {
    echo json_encode(array("error" => "No se ha recibido el ID de la venta"));
}
?>