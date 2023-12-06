<?php

include('../connection.php');

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);


if (isset($data["email"], $data["password"])) {
    $email = $data["email"];
    $password = $data["password"];

    $query = $mysqli->prepare("SELECT patient_id, fname, email, password FROM patients WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;
    $query->bind_result($id, $name, $email, $hashed_password);
    $query->fetch();

    $response = [];

    if ($num_row == 0) {
        $response['status'] = 'error';
        $response['message'] = 'User not found';
    } else {
        if (password_verify($password, $hashed_password)) {
            $response['status'] = 'success';
            $response['patient_id'] = $id;
            $response['name'] = $name;
        } else {
            $response= 'error';
            $response['message'] = 'Wrong inputs';
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid data format';
}

echo json_encode($response);
?>