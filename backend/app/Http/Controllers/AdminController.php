<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AdminController extends Controller
{
    // ✅ Admin Login API
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:3'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation Error', 
                    'errors' => $validator->errors()
                ], 422);
            }

            // Option 1: Database-based authentication (Recommended)
            $admin = Admin::where('email', $request->email)->first();
            
            if ($admin && Hash::check($request->password, $admin->password)) {
                // Create token using Sanctum
                $token = $admin->createToken('admin-token')->plainTextToken;
                
                return response()->json([
                    'message' => 'Login successful!',
                    'admin' => [
                        'id' => $admin->id,
                        'name' => $admin->name,
                        'email' => $admin->email
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer'
                ], 200);
            }

            // Option 2: Fallback to hardcoded admin (if no admin in database)
            $fixedAdmin = [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => '123'
            ];

            if ($request->email === $fixedAdmin['email'] && $request->password === $fixedAdmin['password']) {
                // For hardcoded admin, create a simple token
                $token = 'hardcoded_' . bin2hex(random_bytes(32));
                
                return response()->json([
                    'message' => 'Login successful!',
                    'admin' => [
                        'name' => $fixedAdmin['name'], 
                        'email' => $fixedAdmin['email']
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer'
                ], 200);
            }

            return response()->json(['message' => 'Invalid credentials'], 401);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }//end method

    // ✅ Get Admin Details After Login
    public function getAdminInfo(Request $request)
    {
        try {
            // Check if it's a hardcoded token
            $token = $request->bearerToken();
            
            if ($token && strpos($token, 'hardcoded_') === 0) {
                return response()->json([
                    'message' => 'Admin details retrieved successfully',
                    'admin' => [
                        'name' => 'Admin',
                        'email' => 'admin@example.com'
                    ]
                ], 200);
            }

            // For database users with Sanctum tokens
            $admin = $request->user();
            
            if (!$admin) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            return response()->json([
                'message' => 'Admin details retrieved successfully',
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching admin details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Logout API
    public function logout(Request $request)
    {
        try {
            $token = $request->bearerToken();
            
            // Handle hardcoded token logout
            if ($token && strpos($token, 'hardcoded_') === 0) {
                return response()->json([
                    'message' => 'Logged out successfully'
                ], 200);
            }

            // For Sanctum tokens
            $admin = $request->user();
            if ($admin) {
                $admin->currentAccessToken()->delete();
            }

            return response()->json([
                'message' => 'Logged out successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}