<?php
header("Content-Type: application/json");
require '../quiz_api/db.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Quiz ID is required"]);
    exit;
}

$id = $data['id'];

try {
    $stmt = $conn->prepare("DELETE FROM quizzes WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Quiz deleted successfully"]);
    } else {
        echo json_encode(["message" => "Quiz not found or already deleted"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
