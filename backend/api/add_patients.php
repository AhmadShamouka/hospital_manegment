<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS');
header('Access-Control-Allow-Headers:*');
include('../connection.php');
$json_data = file_get_contents("php://input");

$data = json_decode($json_data, true);
if (isset($data["fname"], $data["lname"], $data["email"], $data["password"], $data["disease"])) {
$first_name = $data["fname"];
$last_name = $data["lname"];
$email = $data["email"];
$password = $data["password"];
$disease = $data["disease"];


$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query=$mysqli->prepare("insert into patients(fname,lname,email,password,disease)
values(?,?,?,?,?)");
$query->bind_param("sssss",$first_name,$last_name,$email,$hashed_password,$disease);
$query->execute();
$response=[];
$response["success"]=true;
echo json_encode($response);

} else {
    $response = ["success" => false, "error" => "Invalid data format"];
    echo json_encode($response);
}?>