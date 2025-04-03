<?php
class Database {
    private $host = "localhost";
    private $port = 3306; 
    private $db_name = "sce";
    private $username = "root"; 
    private $password = "";
    public $conn;

    // Nuevos métodos getter
    public function getHost() {
        return $this->host;
    }

    public function getDbName() {
        return $this->db_name;
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 5,
                PDO::ATTR_PERSISTENT => false
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            $this->conn->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
            $this->conn->exec("SET time_zone = '-06:00'");

        } catch(PDOException $exception) {
            error_log("[".date('Y-m-d H:i:s')."] Error MySQL: ".$exception->getMessage());
            throw new Exception("Error al conectar con la base de datos. Intente más tarde.");
        }
        return $this->conn;
    }
}
?>