<?php

include('../connection.php');
$query=$mysqli->prepare('
SELECT p.fname AS patient_name, d.fname AS doctor_name, a.appointment_date, a.room_id, a.appointment_id
FROM appointments a
LEFT JOIN patients p ON a.patient_id = p.patient_id
LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
');
$query->execute();
$array=$query->get_result();
$response=[];

while($patients=$array->fetch_assoc()){
    $response[]=$patients;
}
echo json_encode($response);