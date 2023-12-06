<?php 

include('../connection.php');
$json_data = file_get_contents("php://input");

$data = json_decode($json_data, true);
if (isset($data["fname"], $data["lname"], $data["number"],$data["email"], $data["password"], $data["disease"])) {
$first_name = $data["fname"];
$last_name = $data["lname"];
$email = $data["email"];
$number = $data["number"];
$password = $data["password"];
$disease = $data["disease"];


$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query=$mysqli->prepare("insert into patients(fname,lname,number,email,password,disease)
values(?,?,?,?,?,?)");
$query->bind_param("ssisss",$first_name,$last_name,$number,$email,$hashed_password,$disease);
$query->execute();
$response=[];
$response["success"]=true;
echo json_encode($response);

} else {
    $response = ["success" => false, "error" => "Invalid data format"];
    echo json_encode($response);
}?>