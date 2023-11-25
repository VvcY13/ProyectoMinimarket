<?php
include "controladorConexion.php";

$correo = $_POST['txtcorreo'];
$contraseña = $_POST['txtcontraseña'];

$conexion = conectar();
$sql = "SELECT * FROM usuario WHERE Correo = '$correo' AND Contraseña = '$contraseña' AND Cargo = 2 ";
$resultado = $conexion->query($sql);
$var = $resultado->fetch_assoc();
if ($resultado->num_rows > 0) {
   
        session_start();
        $_SESSION['idUsuario'] = $var['idUsuario'];
        header("location:main_admin.php");
        exit(); 
    
} else {
    
    header("location:index.html");
}

cerrar($conexion);
?>