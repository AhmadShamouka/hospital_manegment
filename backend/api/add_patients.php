<?php 
header('Access-Control-Allow-Origin:*');
include('../connection.php');
$first_name = $_POST["fname"];
$last_name = $_POST["lname"];
$email= $_POST["email"];
$password= $_POST["password"];
$disease= $_POST["disease"];

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query=$mysqli->prepare("insert into patients(fname,lname,email,password,disease)
values(?,?,?,?,?)");
$query->bind_param("sssss",$first_name,$last_name,$email,$hashed_password,$disease);
$query->execute();
$response=[];
$response["success"]=true;
echo json_encode($response);
?>