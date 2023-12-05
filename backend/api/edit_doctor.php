<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');

$path = explode('/', $_SERVER['REQUEST_URI']);

if (isset($path[5]) && is_numeric($path[5])) {
    $doctor_id = $path[5];

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $query = $mysqli->prepare('SELECT * FROM doctors WHERE doctor_id = ?');
            $query->bind_param('i', $doctor_id);
            $query->execute();
            $result = $query->get_result();

            if ($result->num_rows > 0) {
                $doctorData = $result->fetch_assoc();
                echo json_encode($doctorData);
            } else {
                echo json_encode(['error' => 'Doctor not found']);
            }

            $query->close();
            break;

        case 'PUT':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            $query = $mysqli->prepare('UPDATE doctors SET fname=?, lname=?, email=?, expertise=? WHERE doctor_id = ?');
            $query->bind_param("ssssi", $data['fname'], $data['lname'], $data['email'], $data['expertise'], $doctor_id);

            if ($query->execute()) {
                echo json_encode(['message' => 'doctor data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating doctor data']);
            }
            echo json_encode(['message'=> ($query)]);
            $query->close();
            break;
        case 'DELETE':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            $query = $mysqli->prepare('DELETE From doctors WHERE doctor_id = ?');
            $query->bind_param('i', $doctor_id);
            $query->execute();
            $result = $query->get_result();

            if ($query->execute()) {
                echo json_encode(['message' => 'doctor data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating doctor data']);
            }
        default:
            echo json_encode(['error' => 'Unsupported request method']);
            break;
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>