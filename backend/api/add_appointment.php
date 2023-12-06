<?php 

include('../connection.php');
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
print_r($data);
if (isset($data["doctor_id"],$data["patientId"],$data["appointmentDate"])) {
$doctor_id = $data["doctor_id"];
$appointment_date = $data["appointmentDate"];
$patient_id = $data["patientId"];
$query=$mysqli->prepare("insert into appointments(patient_id,doctor_id,appointment_date)
values(?,?,?)");
$query->bind_param("iis",$patient_id, $doctor_id, $appointment_date);
$query->execute();
$response=[];
$response["success"]=true;
echo json_encode($response);
} else {
    $response = ["error" => "Invalid data format"];
    echo json_encode($response);
}?>