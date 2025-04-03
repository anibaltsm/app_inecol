<?php
// productos.php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Permitir solicitudes CORS preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Incluir el archivo de la base de datos
require_once __DIR__ . '/../database.php'; // Ajusta la ruta si es necesario

$response = [];
$statusCode = 200;

try {
    // Crear una instancia de la clase Database y obtener la conexión
    $database = new Database();
    $conn = $database->getConnection();

    // Consulta para obtener todos los productos
    $stmt = $conn->query("SELECT * FROM productos");
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Preparar la respuesta
    $response = [
        'success' => true,
        'data' => $productos,
        'connection_info' => [
            'host' => $database->getHost(),
            'database' => $database->getDbName(),
            'status' => 'Conectado'
        ]
    ];

} catch(PDOException $e) {
    // En caso de error, preparar el error
    $statusCode = 500;
    $response = [
        'success' => false,
        'error' => $e->getMessage(),
        'error_details' => [
            'code' => $e->getCode(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]
    ];
}

// Enviar la respuesta con el código de estado adecuado
http_response_code($statusCode);
echo json_encode($response);
?>