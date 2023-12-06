<?php 

include('../connection.php');
$json_data = file_get_contents("php://input");

$data = json_decode($json_data, true);

if (isset($data["fname"], $data["lname"], $data["email"], $data["password"], $data["expertise"])) {
    $first_name = $data["fname"];
    $last_name = $data["lname"];
    $email = $data["email"];
    $password = $data["password"];
    $expertise = $data["expertise"];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query = $mysqli->prepare("INSERT INTO doctors (fname, lname, email, password, expertise) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param("sssss", $first_name, $last_name, $email, $hashed_password, $expertise);
    $query->execute();

    $response = ["success" => true];
    echo json_encode($response);
} else {
    $response = ["success" => false, "error" => "Invalid data format"];
    echo json_encode($response);
}
?>