<?php
// Set CORS headers to allow requests from your React app
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root"; // Change if needed
$password = ""; // Change if needed
$dbname = "agriconnect"; // Change to your database name

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get form data
        $crops_name = $_POST['crops_name'] ?? '';
        $type = $_POST['type'] ?? '';
        $date = $_POST['date'] ?? '';
        $date_expected_harvest = $_POST['date_expected_harvest'] ?? '';
        $amount_planted = floatval($_POST['amount_planted'] ?? 0);
        $status = $_POST['status'] ?? 'growing';
        $notes = $_POST['notes'] ?? '';
        
        // Validate required fields
        if (empty($crops_name) || empty($type) || empty($date)) {
            echo json_encode([
                'success' => false,
                'message' => 'Required fields are missing'
            ]);
            exit();
        }

        // Handle file upload
        $crop_image = null;
        if (isset($_FILES['crop_image']) && $_FILES['crop_image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            
            // Create uploads directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            
            $fileExtension = strtolower(pathinfo($_FILES['crop_image']['name'], PATHINFO_EXTENSION));
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            
            if (in_array($fileExtension, $allowedExtensions)) {
                $fileName = uniqid() . '_' . time() . '.' . $fileExtension;
                $uploadPath = $uploadDir . $fileName;
                
                if (move_uploaded_file($_FILES['crop_image']['tmp_name'], $uploadPath)) {
                    $crop_image = $fileName;
                }
            }
        }

        // Insert into database
        $sql = "INSERT INTO crops (crops_name, type, date, date_expected_harvest, amount_planted, status, notes, crop_image, created_at, updated_at) 
                VALUES (:crops_name, :type, :date, :date_expected_harvest, :amount_planted, :status, :notes, :crop_image, NOW(), NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':crops_name', $crops_name);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':date_expected_harvest', $date_expected_harvest);
        $stmt->bindParam(':amount_planted', $amount_planted);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':notes', $notes);
        $stmt->bindParam(':crop_image', $crop_image);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Crop added successfully',
                'crop_id' => $pdo->lastInsertId()
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to add crop'
            ]);
        }
        
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method allowed'
    ]);
}
?>