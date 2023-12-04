<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS');
header('Access-Control-Allow-Headers:*');
include('../connection.php');
$json_data = file_get_contents("php://input");

$data = json_decode($json_data, true);

if (isset($data["email"], $data["password"])) {
    $email = $data["email"];
    $password = $data["password"];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query=$mysqli->prepare("insert into administrators (email,password)
    values(?,?)");
    $query->bind_param("ss", $email, $hashed_password);
    $query->execute();

    $response = ["success" => true];
    echo json_encode($response);
} else {
    $response = ["success" => false, "error" => "Invalid data format"];
    echo json_encode($response);
}
?>