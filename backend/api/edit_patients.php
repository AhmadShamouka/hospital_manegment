<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');

$path = explode('/', $_SERVER['REQUEST_URI']);

if (isset($path[5]) && is_numeric($path[5])) {
    $patient_id = $path[5];

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $query = $mysqli->prepare('SELECT * FROM patients WHERE patient_id = ?');
            $query->bind_param('i', $patient_id);
            $query->execute();
            $result = $query->get_result();

            if ($result->num_rows > 0) {
                $patientData = $result->fetch_assoc();
                echo json_encode($patientData);
            } else {
                echo json_encode(['error' => 'Patient not found']);
            }

            $query->close();
            break;

        case 'PUT':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            $query = $mysqli->prepare('UPDATE patients SET fname=?, lname=?, email=?, disease=? WHERE patient_id = ?');
            $query->bind_param("ssssi", $data['fname'], $data['lname'], $data['email'], $data['disease'], $patient_id);

            if ($query->execute()) {
                echo json_encode(['message' => 'Patient data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating patient data']);
            }

            $query->close();
            break;

        default:
            echo json_encode(['error' => 'Unsupported request method']);
            break;
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>