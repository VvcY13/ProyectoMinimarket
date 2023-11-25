<?php
include 'controladorConexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

$nombreProducto=$_POST["txtNombreProducto"];
$precioProducto=$_POST["txtPrecioProducto"];
$presentacionProducto=$_POST["txtPresentacionProducto"];
$categoriaProducto=$_POST["txtCategoriaProducto"];
$cantidadProducto=$_POST["txtnombre"];

$imagenNombre = $_FILES['ImagenProducto']['name'];
$imagenTipo = $_FILES['ImagenProducto']['type'];
$imagenTmpName = $_FILES['ImagenProducto']['tmp_name'];
$imagenError = $_FILES['ImagenProducto']['error'];
$imagenSize = $_FILES['ImagenProducto']['size'];


$carpetaDestino = 'carpeta_imagenes/'; 
$rutaImagen = $carpetaDestino . $imagenNombre;
move_uploaded_file($imagenTmpName, $rutaImagen);


$conexion = conectar();
$sql = "INSERT INTO tblproductos (Nombre, Precio, Descripcion, Imagen, Cantidad, Categoria ) 
        VALUES ('$nombreProducto', '$precioProducto', '$presentacionProducto', '$rutaImagen','$cantidadProducto','$categoriaProducto')";

if ($conexion->query($sql) === TRUE) {
    
    header("Location: main_admin.php"); 
    exit();
} else {
    echo "Error al agregar el producto: " . $conexion->error;
}

$conexion->close();
} else {
echo "No se han recibido datos mediante el método POST.";
}



?>