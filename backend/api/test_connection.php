<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Permitir solicitudes CORS preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../database.php'; // O ajusta la ruta según sea necesario


$response = [];
$statusCode = 200;

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Prueba de conexión
    $stmt = $conn->query("SELECT 
        'Conexión exitosa' AS message, 
        VERSION() AS mysql_version,
        DATABASE() AS current_database,
        NOW() AS server_time");
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $response = [
        'success' => true,
        'data' => $result,
        'connection_info' => [
            'host' => $database->getHost(),
            'database' => $database->getDbName(),
            'status' => 'Conectado'
        ]
    ];

} catch(PDOException $e) {
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

http_response_code($statusCode);
echo json_encode($response);
?>