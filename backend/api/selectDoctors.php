<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');
$query=$mysqli->prepare('select * FROM doctors');
$query->execute();
$array=$query->get_result();
$response=[];

while($doctors=$array->fetch_assoc()){
    $response[]=$doctors;
}
echo json_encode($response);