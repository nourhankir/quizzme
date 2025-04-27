<?php
header("Content-Type: application/json");
require '../quiz_api/db.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required = ['id', 'question', 'option_a', 'option_b', 'option_c', 'correct_answer'];
foreach ($required as $field) {
    if (!isset($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing field: $field"]);
        exit;
    }
}

$id = $data['id'];
$question = $data['question'];
$option_a = $data['option_a'];
$option_b = $data['option_b'];
$option_c = $data['option_c'];

$correct_answer = strtoupper($data['correct_answer']);

try {
    $stmt = $conn->prepare("
        UPDATE questions 
        SET question = ?, option_a = ?, option_b = ?, option_c = ?, correct_answer = ?
        WHERE id = ?
    ");
    $stmt->execute([$question, $option_a, $option_b, $option_c, $correct_answer, $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Question updated successfully"]);
    } else {
        echo json_encode(["message" => "No changes made or question not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>





