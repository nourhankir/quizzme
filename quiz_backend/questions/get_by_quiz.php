<?php
header("Content-Type: application/json");
require '../quiz_api/db.php';

// Read input (GET or JSON POST for flexibility)
$quiz_id = $_GET['quiz_id'] ?? null;

if (!$quiz_id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing quiz_id"]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM questions WHERE quiz_id = ?");
    $stmt->execute([$quiz_id]);
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($questions);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
