<?php
header('Access-Control-Allow-origin:*');
include('../connection.php');
$email = $_POST["email"];
$password = $_POST["password"];

$query = $mysqli->prepare("select doctor_id, fname,email,password from doctors where email = ?");
$query->bind_param('s',$email);
$query->execute();
$query->store_result();
$num_row=$query->num_rows;
$query->bind_result($id,$name,$email,$hashed_password);
$query->fetch();


$response = [];

if ($num_row == 0) {
    $response['status'] = 'error';
    $response['message'] = 'User not found';
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = 'success';
        $response['user_id'] = $id;
        $response['name'] = $name;
    } else {
       
        $response['message'] = 'Wrong inputs';
    }
}

echo json_encode($response);