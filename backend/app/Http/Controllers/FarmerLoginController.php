<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class FarmerLoginController extends Controller
{
    // ✅ Farmer Login API (Phone & Password)
   public function login(Request $request)
    {
        //dd($request->all()); // 🔍 Debug incoming request data

        $validator = Validator::make($request->all(), [
            'phone' => 'required|string', // ✅ Must exist in farmers table
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation Error', 'errors' => $validator->errors()], 422);
        }

    //       // ✅ Use Laravel's Auth system for login
    // if (!Auth::guard('farmer')->attempt(['phone' => $request->phone, 'password' => $request->password])) {
    //     return response()->json(['message' => 'Invalid credentials'], 401);
    // }
    $farmer = \App\Models\Farmer::where('phone', $request->phone)->first();
     \Log::info('Phone in request:', [$farmer]);
    //  return response()->json(['message'=> 'farmer','farmer'=> $farmer],200);
if (!$farmer || !Hash::check($request->password, $farmer->password)) {
    return response()->json(['message' => 'Invalid credentials'], 401);
}

   // $farmer = Auth::guard('farmer')->user(); // ✅ Retrieve authenticated farmer
    $token = $farmer->createToken('farmer-token')->plainTextToken;


        return response()->json([
            'message' => 'Login successful!',
            'farmer' => ['name' => $farmer->name, 'phone' => $farmer->phone],
           'token' => $token
         ], 200);
}

    

    // ✅ Get authenticated farmer details (Dashboard purpose)
   public function getFarmerInfo(Request $request)
{
    try {
        $farmer = Auth::guard('farmer')->user(); // ✅ Use Auth guard

        return response()->json([
            'message' => 'Farmer details retrieved successfully',
            'farmer' => $farmer
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error fetching farmer details',
            'error' => $e->getMessage()
        ], 500);
    }
}
}