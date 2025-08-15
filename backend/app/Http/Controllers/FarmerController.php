<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FarmerController extends Controller
{
    // ✅ Farmer Registration API
    public function register(Request $request)
    {
        try {
            // Validate input manually to catch exceptions
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'phone' => 'required|string|unique:farmers,phone',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            // Create farmer
            $farmer = Farmer::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'password' => Hash::make($request->password) // More secure than bcrypt()
            ]);

            return response()->json([
                'message' => 'Farmer registered successfully',
                'farmer' => $farmer
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering farmer',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Get All Farmers for Admin Panel
    public function getFarmers(Request $request)
    {
        try {
            $farmers = Farmer::paginate(10); // Added pagination for efficiency
            return response()->json([
                'message' => 'Farmers retrieved successfully',
                'data' => $farmers
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching farmers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

//get farmer data

