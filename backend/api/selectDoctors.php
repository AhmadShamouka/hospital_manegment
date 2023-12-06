<?php

include('../connection.php');
$query=$mysqli->prepare('select * FROM doctors');
$query->execute();
$array=$query->get_result();
$response=[];

while($doctors=$array->fetch_assoc()){
    $response[]=$doctors;
}
echo json_encode($response);