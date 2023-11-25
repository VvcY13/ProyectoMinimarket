<?php
include "controladorConexion.php";

$nombres = $_POST["txtnombre"];
$apellidos = $_POST["txtapellido"];
$email = $_POST["txtcorreo"];
$contraseña = $_POST["txtcontraseña"];
$cargo = 1;

    $conexion = conectar();

    // Validamos que el correo electrónico sea correcto
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El correo electrónico no es válido";
        exit();
    }

    // Validamos que la contraseña tenga al menos 8 caracteres
    if (strlen($contraseña) < 8) {
        echo "La contraseña debe tener al menos 8 caracteres";
        exit();
    }

    // Preparamos la consulta SQL
    $sql = "INSERT INTO usuario (IdUsuario,Nombre, Apellidos, Correo, Contraseña, Cargo) VALUES (NULL, ?, ?, ?, ?, ?)";

    // Vinculamos los parámetros a la consulta
    $stmt = $conexion->prepare($sql);
    mysqli_stmt_bind_param($stmt, "sssss", $nombres, $apellidos,$email, $contraseña,$cargo);
    
    // Ejecutamos la consulta y comprobamos el resultado
    if ($stmt->execute()) {
        header ("location:index.html" );
        // La consulta se ha ejecutado correctamente
        
    } else {
        // La consulta ha fallado
        echo "error";
    }
    // Cerramos la conexión
    cerrar($conexion);


?>