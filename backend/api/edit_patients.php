<?php

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

            $query = $mysqli->prepare('UPDATE patients SET fname=?, lname=?, email=?, disease=?, room_id=? WHERE patient_id = ?');
            $query->bind_param("ssssii", $data['fname'], $data['lname'], $data['email'], $data['disease'], $data['room_id'], $patient_id);

            if ($query->execute()) {
                echo json_encode(['message' => 'Patient data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating patient data']);
            }

            $query->close();
            break;
        case 'DELETE':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            $query = $mysqli->prepare('DELETE From patients WHERE patient_id = ?');
            $query->bind_param('i', $patient_id);
            $query->execute();
            $result = $query->get_result();

            if ($query->execute()) {
                echo json_encode(['message' => 'Patient data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating patient data']);
            }
        default:
            echo json_encode(['error' => 'Unsupported request method']);
            break;
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>