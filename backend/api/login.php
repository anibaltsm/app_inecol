<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Archivo para funciones de autenticación
include 'includes/auth.php';

// Obtener datos del request
$data = json_decode(file_get_contents("php://input"), true);

// Validar datos recibidos
if (!$data || !isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$username = $data['username'];
$password = $data['password'];

// Credenciales válidas (en producción usar base de datos)
$validCredentials = [
    'admin' => 'admin123' // Cambia esto por tus credenciales reales
];

// Verificar credenciales
if (isset($validCredentials[$username]) && $validCredentials[$username] === $password) {
    $response = [
        'success' => true,
        'token' => generateToken($username),
        'user' => [
            'username' => $username,
            'role' => 'admin'
        ]
    ];
    http_response_code(200);
} else {
    $response = [
        'success' => false,
        'message' => 'Credenciales incorrectas'
    ];
    http_response_code(401);
}

echo json_encode($response);
?>