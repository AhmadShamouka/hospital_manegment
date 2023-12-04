<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');
$query=$mysqli->prepare('select * FROM doctors');
$query->execute();
$array=$query->get_result();
$response=[];

while($restaurant=$array->fetch_assoc()){
    $response[]=$restaurant;
}
echo json_encode($response);