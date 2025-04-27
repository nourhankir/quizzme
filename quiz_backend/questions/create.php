<?php
header("Content-Type: application/json");
require '../quiz_api/db.php'; // Adjust path as needed

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input fields
$required = ['quiz_id', 'question', 'option_a', 'option_b', 'option_c', 'correct_answer'];
foreach ($required as $field) {
    if (!isset($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "Missing field: $field"]);
        exit;
    }
}

$quiz_id = $data['quiz_id'];
$question = $data['question'];
$option_a = $data['option_a'];
$option_b = $data['option_b'];
$option_c = $data['option_c'];

$correct_answer = strtoupper($data['correct_answer']); // Ensure A, B, C, D

try {
    $stmt = $conn->prepare("INSERT INTO questions 
        (quiz_id, question, option_a, option_b, option_c, correct_answer) 
        VALUES (?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([$quiz_id, $question, $option_a, $option_b, $option_c, $correct_answer]);

    echo json_encode(["message" => "Question added successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
