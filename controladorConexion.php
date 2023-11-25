<?php

function conectar() {
    $servidor = "localhost:3307";
    $usuario = "root";
    $password = "";
    $basedatos = "tiendanew";
    $conexion = new mysqli($servidor, $usuario, $password, $basedatos);
    $conexion->set_charset("utf8");
    return $conexion;
}
function cerrar($conexion) {
    $conexion->close();
}



?>