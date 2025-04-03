<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'includes/auth.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Validación simple (deberías usar una base de datos)
if ($username === 'admin' && $password === 'admin123') {
    $response = [
        'success' => true,
        'token' => generateToken($username),
        'user' => [
            'username' => $username,
            'role' => 'admin'
        ]
    ];
} else {
    $response = [
        'success' => false,
        'message' => 'Credenciales incorrectas'
    ];
}

echo json_encode($response);
?>