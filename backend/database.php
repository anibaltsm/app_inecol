<?php
class Database {
    // Configuración para conexión directa
    private $host = "189.240.218.38"; // IP pública del servidor
    private $port = 3306;             // Puerto MySQL
    private $db_name = "sce";
    private $username = "root";       // Considera usar un usuario no root
    private $password = "515t3ma5-2018";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 5, // Timeout de 5 segundos
                PDO::ATTR_PERSISTENT => false // Conexiones no persistentes
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
            // Configuración adicional recomendada
            $this->conn->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
            $this->conn->exec("SET time_zone = '-06:00'"); // Ajusta según tu zona horaria
            
        } catch(PDOException $exception) {
            // Manejo seguro de errores
            error_log("[".date('Y-m-d H:i:s')."] Error MySQL: ".$exception->getMessage());
            throw new Exception("Error al conectar con la base de datos. Intente más tarde.");
        }
        return $this->conn;
    }
}
?>