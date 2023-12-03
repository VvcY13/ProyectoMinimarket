<?php
include 'controladorConexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $idProducto=$_POST["idProducto"];
    $nombreProducto=$_POST["txtNombreProducto"];
    $precioProducto=$_POST["txtPrecioProducto"];
    $presentacionProducto=$_POST["txtPresentacion"];
    $categoriaProducto=$_POST["txtCategoriaProducto"];
    $cantidadProducto=$_POST["txtCantidad"];

    $nuevoprecio = floatval($precioProducto);
    $preciosinigv =$nuevoprecio-($nuevoprecio*0.18);
    
    $conexion = conectar();
    $sql = "UPDATE tblproductos 
        SET Nombre = '$nombreProducto', 
            Precio = '$precioProducto', 
            Descripcion = '$presentacionProducto', 
            Cantidad = '$cantidadProducto', 
            Categoria = '$categoriaProducto',
            precioSinIGV = '$preciosinigv' 
        WHERE ID = $idProducto";
    
    if ($conexion->query($sql) === TRUE) {
        
        header("Location: almacen.php"); 
        exit();
    } else {
        echo "Error al editar el producto: " . $conexion->error;
    }
    $conexion->close();
    }

?>