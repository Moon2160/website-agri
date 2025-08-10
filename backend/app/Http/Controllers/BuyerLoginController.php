<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class BuyerLoginController extends Controller
{
    // ✅ Buyer Login API (Phone & Password)
   public function login(Request $request)
    {

         $request->merge([
        'email' => trim($request->email),
        'password' => trim($request->password)
    ]);

        //dd($request->all()); // 🔍 Debug incoming request data

        $validator = Validator::make($request->all(), [
            'email' => 'required|string', // ✅ Must exist in buyers table
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation Error', 'errors' => $validator->errors()], 422);
        }

    //       // ✅ Use Laravel's Auth system for login
    // if (!Auth::guard('farmer')->attempt(['phone' => $request->phone, 'password' => $request->password])) {
    //     return response()->json(['message' => 'Invalid credentials'], 401);
    // }
   $buyer = \App\Models\Buyer::where('email', $request->email)->first();
     \Log::info('email in request:', [$buyer]);
    //  return response()->json(['message'=> 'farmer','farmer'=> $farmer],200);
if (!$buyer || !Hash::check($request->password, $buyer->password)) {
    return response()->json(['message' => 'Invalid credentials'], 401);
}

   // $farmer = Auth::guard('farmer')->user(); // ✅ Retrieve authenticated farmer
    $token = $buyer->createToken('buyer-token')->plainTextToken;


        return response()->json([
            'message' => 'Login successful!',
            'buyer' => ['name' => $buyer->name, 'email' => $buyer->email],
           'token' => $token
         ], 200);
}

    

    // ✅ Get authenticated buyer details (Dashboard purpose)
   public function getBuyerInfo(Request $request)
{
    try {
        $buyer = Auth::guard('buyer')->user(); // ✅ Use Auth guard

        return response()->json([
            'message' => 'Buyer details retrieved successfully',
            'buyer' => $buyer
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error fetching buyer details',
            'error' => $e->getMessage()
        ], 500);
    }
}
}