<?php
header("Content-Type: application/json");
require '../quiz_api/db.php'; // adjust path if needed

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['title'])) {
    http_response_code(400);
    echo json_encode(["error" => "Quiz title is required"]);
    exit;
}

$title = $data['title'];

try {
    $stmt = $conn->prepare("INSERT INTO quizzes (title) VALUES (?)");
    $stmt->execute([$title]);

    echo json_encode([
        "message" => "Quiz created successfully",
        "quiz_id" => $conn->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
