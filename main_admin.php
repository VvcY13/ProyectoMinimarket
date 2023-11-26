

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="shortcut icon" href="img/favicon-removebg-preview.png" type="image/x-icon">
    <title>Inicio | Admin</title>
</head>
<body>
    <div class="wrapper">
        <header class="header-mobile">
            <img class="logo" src="img/D_Todo-whitec.jpg" alt="minimarket">
         
            <button class="open-menu" id="open-menu">
                <i class="bi bi-list"></i>
            </button>
        </header>
        <aside>
            <button class="close-menu" id="close-menu">
                <i class="bi bi-x"></i>
            </button>
            <header>
                <img class="logo" src="img/D_Todo-whitec.jpg" alt="minimarket">
             
            </header>
            <nav>
                <ul class="menu">
                    <li>
                        <button id="todos" class="boton-menu boton-categoria active"><i class="bi bi-hand-index-thumb-fill"></i> Inicio</button>
                    </li>
                    <li>
                        <a class="boton-menu boton-salir" href="./almacen.php">
                            <i class="bi bi-box2"></i> Almacén
                        </a>
                    </li>
                    <li>
                        <a class="boton-menu boton-salir" href="./newProduct.html">
                            <i class="bi bi-clipboard-check"></i> Nuevo Producto
                        </a>
                    </li>
                    <li>
                        <a class="boton-menu boton-salir" href="./ventasAdmin.html">
                            <i class="bi bi-clipboard2-data"></i>Ventas
                        </a>
                    </li>
            
                    <li>
                        <a class="boton-menu boton-salir" href="./login_admin.html">
                            <i class="bi bi-box-arrow-in-right"></i> Cerrar Sesión 
                        </a>
                    </li>
                </ul>
            </nav>
            <footer>
                <p class="texto-footer"><span>© 2023</span> Grupo 02 | Arq. de Software</p>
            </footer>
        </aside>
        <div class="contenedor-admin">
            <h2 class="titulo-principal" id="titulo-principal">Sección administración</h2>
            <div id="contenedor-productos" class="contenedor-productos">         
    </div>
    <div class="text-admin">
    <h2><span>Bienvenido</span><br>
        En esta sección de la plataforma web podrá gestionar el almacén, visualizar, editar y agregar productos, además de tener seguimiento del estado de las ventas y sus detalles.</h2>
    
</div>
</div>
    </div>
   
    <script src="./js/menu.js"></script>
</body>
</html>