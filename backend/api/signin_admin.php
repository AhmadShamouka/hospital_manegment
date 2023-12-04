<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: *');
include('../connection.php');

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);


if (isset($data["email"], $data["password"])) {
    $email = $data["email"];
    $password = $data["password"];
    $query = $mysqli->prepare("SELECT admin_id, email, password FROM administrators WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;
    $query->bind_result($id, $email, $hashed_password);
    $query->fetch();

    $response = [];

    if ($num_row == 0) {
        $response['status'] = 'error';
        $response['message'] = 'User not found';
    } else {
        if (password_verify($password, $hashed_password)) {
            $response = 'success';
          
        } else {
            $response = 'error';
          
        }
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid data format';
}

echo json_encode($response);
?>