
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
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\DB;

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

//get data
Route::get('/farmers', [FarmerController::class, 'getFarmers']);
Route::get('/buyers', [BuyerController::class, 'getBuyers']); 


// Test route
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'timestamp' => now(),
        'database_connection' => 'OK'
    ]);
});

// Farmers API Route
Route::get('/farmers', function () {
    try {
        $farmers = DB::table('farmers')
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        // Debug log
        \Log::info('Farmers API called, found: ' . $farmers->count() . ' records');
        
        return response()->json($farmers);
        
    } catch (\Exception $e) {
        \Log::error('Farmers API Error: ' . $e->getMessage());
        
        return response()->json([
            'error' => 'Database error',
            'message' => $e->getMessage(),
            'endpoint' => '/api/farmers'
        ], 500);
    }
});

// Buyers API Route  
Route::get('/buyers', function () {
    try {
        $buyers = DB::table('buyers')
                   ->orderBy('created_at', 'desc')
                   ->get();
        
        // Debug log
        \Log::info('Buyers API called, found: ' . $buyers->count() . ' records');
        
        return response()->json($buyers);
        
    } catch (\Exception $e) {
        \Log::error('Buyers API Error: ' . $e->getMessage());
        
        return response()->json([
            'error' => 'Database error',
            'message' => $e->getMessage(), 
            'endpoint' => '/api/buyers'
        ], 500);
    }
});

// 🌾 CROPS ROUTES - নতুন যোগ করা হলো
// Route::middleware(['cors'])->group(function () {
//     Route::get('/crops', [CropsController::class, 'getCrops']);
//     Route::post('/crops', [CropsController::class, 'addCrop']);
//     Route::get('/crops/{id}', [CropsController::class, 'getCrop']);
//     Route::put('/crops/{id}', [CropsController::class, 'updateCrop']);
//     Route::delete('/crops/{id}', [CropsController::class, 'deleteCrop']);
// });

// Alternative direct routes if controller approach doesn't work
Route::get('/getCrops', function () {
    try {
        $crops = DB::table('crops')
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        return response()->json($crops);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage(),
            'data' => []
        ], 500);
    }
});

Route::post('/addCrop', function (Request $request) {
    try {
        // Validation
        $request->validate([
            'crops_name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'date' => 'required|date',
            'amount_planted' => 'numeric|min:0',
        ]);

        // Handle file upload
        $cropImage = null;
        if ($request->hasFile('crop_image')) {
            $file = $request->file('crop_image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $filename);
            $cropImage = $filename;
        }

        // Insert into database
        $cropId = DB::table('crops')->insertGetId([
            'crops_name' => $request->crops_name,
            'type' => $request->type,
            'date' => $request->date,
            'date_expected_harvest' => $request->date_expected_harvest,
            'amount_planted' => floatval($request->amount_planted ?? 0),
            'status' => $request->status ?? 'growing',
            'notes' => $request->notes,
            'crop_image' => $cropImage,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Crop added successfully',
            'crop_id' => $cropId
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error adding crop: ' . $e->getMessage()
        ], 500);
    }
});

//sales report

Route::post('/products', [ProductController::class, 'store']);


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