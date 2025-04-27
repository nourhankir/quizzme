<?php
// Enable JSON output
header("Content-Type: application/json");

// Include database connection
require 'db.php';

// Decode incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit;
}

$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Securely hash password

try {
    // Insert into users table
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $password]);

    echo json_encode(["message" => "User registered successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>

