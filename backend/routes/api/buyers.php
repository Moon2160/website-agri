<?php
// api/buyers.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include database connection
require_once 'config.php';

try {
    // Fetch buyers from database
    $stmt = $pdo->prepare("SELECT * FROM buyers ORDER BY created_at DESC");
    $stmt->execute();
    $buyers = $stmt->fetchAll();
    
    // Debug: Log the query result
    error_log("Buyers found: " . count($buyers));
    
    // Return JSON response
    echo json_encode($buyers);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage(),
        'file' => 'buyers.php'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage(),
        'file' => 'buyers.php'
    ]);
}
?>