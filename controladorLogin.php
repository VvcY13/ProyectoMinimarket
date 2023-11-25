<?php

include "controladorConexion.php";

$correo = $_POST['txtcorreo'];
$contraseña = $_POST['txtcontraseña'];

// Realizamos la consulta
$conexion = conectar();
$sql = "SELECT * FROM usuario WHERE Correo = '$correo' AND Contraseña = '$contraseña'";
$resultado = $conexion->query($sql);
$var = $resultado->fetch_assoc();

// Si el resultado no es nulo, el usuario existe y la contraseña es correcta
if ($resultado->num_rows > 0) {
    // Verificar el cargo del usuario
        session_start();
        $_SESSION['idUsuario'] = $var['idUsuario'];
        header("location:main.html");
        exit(); // ¡Importante para detener la ejecución después de la redirección!
    
} else {
    // El usuario o la contraseña no son correctos
    header("location:index.html");
}

cerrar($conexion);

?>