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

    // Devuelve los productos como JSON
    echo json_encode($productos);

    // Cierra la conexión a la base de datos
    $conexion->close();
}

// Verifica si se proporciona el parámetro 'Categoria' en la URL
if (isset($_GET['Categoria'])) {
    $categoria = $_GET['Categoria'];
    obtenerProductosPorCategoria($categoria);
} else {
    // Si no se proporciona una categoría, obtén todos los productos
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

    // Devuelve todos los productos como JSON
    echo json_encode($productos);

    // Cierra la conexión a la base de datos
    $conexion->close();
}


?>