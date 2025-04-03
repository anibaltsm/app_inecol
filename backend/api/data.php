<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include 'includes/auth.php';

// Verificar token
if (!validateToken()) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

// Datos de ejemplo (deberías conectarte a una base de datos)
$data = [
    ['id' => 1, 'nombre' => 'Producto 1', 'precio' => 100, 'stock' => 10],
    ['id' => 2, 'nombre' => 'Producto 2', 'precio' => 200, 'stock' => 5],
    ['id' => 3, 'nombre' => 'Producto 3', 'precio' => 150, 'stock' => 8],
];

echo json_encode($data);
?>