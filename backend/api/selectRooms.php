<?php

include('../connection.php');
$query=$mysqli->prepare('select * FROM rooms');
$query->execute();
$array=$query->get_result();
$response=[];

while($patients=$array->fetch_assoc()){
    $response[]=$patients;
}
echo json_encode($response);