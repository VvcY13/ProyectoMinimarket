<?php

include "controladorConexion.php";

function obtenerProductosPorCategoria($categoria) {
    $conexion = conectar();

    $sql = "SELECT * FROM tblproductos WHERE Categoria = '$categoria'";
    $result = $conexion->query($sql);

    $productos = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $productos[] = array(
                'ID'=> $row['ID'],
                'Nombre' => $row['Nombre'],
                'Precio' => $row['Precio'],
                'Descripcion' => $row['Descripcion'],
                'Imagen' => $row['Imagen'],
                'Cantidad' => $row['Cantidad'],
                'Categoria' => $row['Categoria']
            );
        }
    }

    echo json_encode($productos);

    $conexion->close();
}


if (isset($_GET['Categoria'])) {
    $categoria = $_GET['Categoria'];
    obtenerProductosPorCategoria($categoria);
} else {
    $conexion = conectar();

    $sql = "SELECT * FROM tblproductos";
    $result = $conexion->query($sql);

    $productos = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $productos[] = array(
                'ID'=> $row['ID'],
                'Nombre' => $row['Nombre'],
                'Precio' => $row['Precio'],
                'Descripcion' => $row['Descripcion'],
                'Imagen' => $row['Imagen'],
                'Cantidad' => $row['Cantidad'],
                'Categoria' => $row['Categoria']
            );
        }
    }

    echo json_encode($productos);

    $conexion->close();
}


?>