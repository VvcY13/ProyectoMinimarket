<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="shortcut icon" href="img/logo/favicon-removebg-preview.png" type="image/x-icon">
    <title>Almacén</title>
</head>
<body>
    <div class="wrapper-almacen">
        <header class="header-mobile">
            <img class="logo" src="img/D_Todo-whitec.jpg" alt="minimarket">
            <!-- <h1 class="logo">D'Todo</h1> -->
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
                <!-- <h1 class="logo">D'Todo</h1> -->
            </header>
            <nav>
                <ul class="menu">
                    
                    <li>
                        <button id="Abarrotes" class="boton-menu boton-categoria active"><i class="bi bi-hand-index-thumb"></i>Almacén</button>
                    </li>
                    <li>
                        <a class="boton-menu boton-salir" href="./main_admin.php">
                            <i class="bi bi-box-arrow-in-right"></i> Regresar
                        </a>
                    </li>
                    
                </ul>
            </nav>
            <footer>
                <p class="texto-footer"><span>© 2023</span> Grupo 02 | Arq. de Software</p>
            </footer>
        </aside>
        <main>
            <h2 class="titulo-principal" id="titulo-principal">Almacén</h2>
            <div id="contenedor-productos" class="contenedor-productos-admin">
                <!-- Esto se va a rellenar con JS -->
            </div>
        </main>
    </div>
    <script src="./js/almacen.js"></script>
    <script src="./js/menu.js"></script>
</body>
</html>