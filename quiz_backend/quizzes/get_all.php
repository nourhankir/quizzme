<?php
header("Content-Type: application/json");
require '../quiz_api/db.php'; 
try{
    $stmt=$conn->query("SELECT * FROM quizzes");
    $quizzes=$stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($quizzes);

}
catch(PDOException $e){
    http_response_code(500);
    echo json_encode(["error"=>$e->getMessage()]);
}







?>