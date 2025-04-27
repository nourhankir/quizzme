<?php
header("Content-Type: application/json");
require 'db.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check for required fields
if (!isset($data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing email or password"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

try {
    // Find the user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists and password is correct
    if ($user && password_verify($password, $user['password'])) {
        echo json_encode([
            "message" => "Login successful",
            "user_id" => $user['id'],
            "email" => $user['email']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
