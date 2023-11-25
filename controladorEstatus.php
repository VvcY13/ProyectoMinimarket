<?php
include "controladorConexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["IDCompra"])) {
    
    $idVenta = $_POST["IDCompra"];
    $conexion = conectar();
    $sql = "UPDATE compras SET Estado = 'Listo' WHERE idCompras = $idVenta";
    if ($conexion->query($sql) === TRUE) {
        // Considera enviar una respuesta adecuada si la actualización fue exitosa
        echo json_encode(array("message" => "Estatus cambiado correctamente"));
        exit();
    } else {
        // Envía un mensaje de error si hay un problema con la actualización
        echo json_encode(array("error" => "Error al cambiar el estatus"));
    }
} else {
    echo json_encode(array("error" => "No se ha recibido el ID de la venta"));
}
?>