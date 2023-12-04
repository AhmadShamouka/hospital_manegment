<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');
$query=$mysqli->prepare('select * FROM patients');
$query->execute();
$array=$query->get_result();
$response=[];

while($patients=$array->fetch_assoc()){
    $response[]=$patients;
}
echo json_encode($response);