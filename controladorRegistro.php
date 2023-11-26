<?php
include "controladorConexion.php";

$nombres = $_POST["txtnombre"];
$apellidos = $_POST["txtapellido"];
$email = $_POST["txtcorreo"];
$contraseña = $_POST["txtcontraseña"];
$cargo = 1;

    $conexion = conectar();
   
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El correo electrónico no es válido";
        exit();
    }

    if (strlen($contraseña) < 8) {
        echo "La contraseña debe tener al menos 8 caracteres";
        exit();
    }

    $sql = "INSERT INTO usuario (IdUsuario,Nombre, Apellidos, Correo, Contraseña, Cargo) VALUES (NULL, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);
    mysqli_stmt_bind_param($stmt, "sssss", $nombres, $apellidos,$email, $contraseña,$cargo);
    
    if ($stmt->execute()) {
        header ("location:index.html" );
    
    } else {
        echo "error";
    }
    
    cerrar($conexion);


?>