
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\BuyerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FarmerLoginController;
use App\Http\Controllers\BuyerLoginController;
use App\Http\Controllers\FarmerDashboardController;


//authenticated routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//un authenticated routes
Route::post('/login', [AuthController::class, 'login']);


//auth as middleware
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//reg farmer route


Route::post('/register-farmer', [FarmerController::class, 'register']);

//reg buyer route
Route::post('/register-buyer', [BuyerController::class, 'register']);


//admin login
Route::post('/admin-login', [AdminController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin-dashboard', [AdminController::class, 'dashboard']);
});

//farmer login

Route::post('/farmer-login', [FarmerLoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/farmer-info', [FarmerLoginController::class, 'getFarmerInfo']);
});

//buyer login

Route::post('/buyer-login', [BuyerLoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/buyer-info', [BuyerLoginController::class, 'getBuyerInfo']);
});

//Farmer dashboard
Route::middleware('auth:api')->get('/farmer-dashboard', [FarmerDashboardController::class, 'show']);


// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\FarmerController;

// // ✅ Enable CSRF Protection & CORS
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');

// // 🔹 Authenticated Routes (Protected APIs)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });

//     Route::post('/logout', [AuthController::class, 'logout']); // ✅ Logout with Sanctum Auth
// });

// // 🔹 Public Routes (Unprotected APIs)
// Route::post('/login', [AuthController::class, 'login']); // ✅ Login API
// Route::post('/register-farmer', [FarmerController::class, 'register']); // ✅ Farmer Registration API

// // 🔹 Admin Routes (Access Control for Admin Panel)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/admin/farmers', [FarmerController::class, 'getFarmers']); // ✅ Admin Panel - Farmer List
// });