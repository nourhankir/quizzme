<?php
header("Content-Type: application/json");
require '../quiz_api/db.php'; // adjust if needed

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate inputs
if (!isset($data['id'], $data['title'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing quiz ID or new title"]);
    exit;
}

$id = $data['id'];
$title = $data['title'];

try {
    $stmt = $conn->prepare("UPDATE quizzes SET title = ? WHERE id = ?");
    $stmt->execute([$title, $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Quiz updated successfully"]);
    } else {
        echo json_encode(["message" => "No changes made or quiz not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
