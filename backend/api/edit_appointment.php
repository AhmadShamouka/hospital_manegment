<?php

include('../connection.php');

$path = explode('/', $_SERVER['REQUEST_URI']);

if (isset($path[5]) && is_numeric($path[5])) {
    $appointment_id = $path[5];

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $query = $mysqli->prepare(' SELECT p.fname AS patient_name, d.fname AS doctor_name, a.appointment_date, a.room_id, a.appointment_id
            FROM appointments a
            LEFT JOIN patients p ON a.patient_id = p.patient_id
            LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
            WHERE a.appointment_id = ?');
            $query->bind_param('i', $appointment_id);
            $query->execute();
            $result = $query->get_result();

            if ($result->num_rows > 0) {
                $appointment_data = $result->fetch_assoc();
                echo json_encode($appointment_data);
            } else {
                echo json_encode(['error' => 'Appointment not found']);
            }

            $query->close();
            break;

        case 'PUT':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);
            
            error_log(json_encode($data));
            
            $query = $mysqli->prepare('UPDATE appointments SET patient_id=?, doctor_id=?, appointment_date=?, room_id=? WHERE appointment_id=?');
            $query->bind_param("iisii", $data['patient_id'], $data['doctor_id'], $data['appointment_date'], $data['room_id'], $data['appointment_id']);
            
            if ($query->execute()) {
                echo json_encode(['message' => 'Appointment data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating appointment data: ' . $mysqli->error]);
            }
            
            $query->close();
            
            break;
        case 'DELETE':
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);

            $query = $mysqli->prepare('DELETE From appointments WHERE appointment_id = ?');
            $query->bind_param('i', $appointment_id);
            $query->execute();
            $result = $query->get_result();

            if ($query->execute()) {
                echo json_encode(['message' => 'appointment data updated successfully']);
            } else {
                echo json_encode(['error' => 'Error updating appointment_id data']);
            }
        default:
            echo json_encode(['error' => 'Unsupported request method']);
            break;
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>