<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BuyerController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:buyers,email',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $buyer = Buyer::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'message' => 'Buyer registered successfully',
                'buyer' => $buyer
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering buyer',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getBuyers(Request $request)
    {
        try {
            $buyers = Buyer::paginate(10);
            return response()->json([
                'message' => 'Buyers retrieved successfully',
                'data' => $buyers
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching buyers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
