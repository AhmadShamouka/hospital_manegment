<?php 
header('Access-Control-Allow-Origin:*');
include('../connection.php');
$first_name = $_POST["fname"];
$last_name = $_POST["lname"];
$email= $_POST["email"];
$password= $_POST["password"];
$expertise= $_POST["expertise"];

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query=$mysqli->prepare("insert into doctors(fname,lname,email,password,expertise)
values(?,?,?,?,?)");
$query->bind_param("sssss",$first_name,$last_name,$email,$hashed_password,$expertise);
$query->execute();
$response=[];
$response["success"]=true;
echo json_encode($response);
?>