<?php
header("Content-Type: application/json");
require '../quiz_api/db.php'; 
$data=json_decode(file_get_contents("php://input"), true);
if(!isset($data['id'])){
    http_response_code(400);
    echo json_encode(["error"=>"Question ID is required"]);
    exit;
}
$id=$data['id'];
try{
    $stmt=$conn->prepare('delete from questions where id=?');
    $stmt->execute([$id]);
    if ($stmt->rowCount()>0){
        echo json_encode(['message'=>"Question deleted successfully"]);
    }
    else{
        echo json_encode(['message'=>"Question not found or already deleted"]);
    }
    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(['error'=>$e->getMessage()]);
    }









?>