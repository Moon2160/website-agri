<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
            'email' => 'nullable|email',
            'phone' => 'nullable',
            'password' => 'required|string',
        ]);
        
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = $request->input('password');

        if ($email) {
            $credentials = $request->only('email', 'password');
            if(!Auth::attempt($credentials)){
                return response()->json(['message' => 'Invalid credentials'], 401);
            };

            $user = Auth::user();
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $user->createToken('auth_token')->plainTextToken,
            ], 200);

        } elseif ($phone) {
            
            $user = User::where('phone', $phone)->first();

            if(!$user)
                return response()->json(['message' => 'Invalid credentials'], 401);
            if(!password_verify($password, $user->password))
                return response()->json(['message' => 'Invalid credentials'], 401);


            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $user->createToken('auth_token')->plainTextToken,
            ], 200);

        } else {
            return response()->json(['message' => 'Email or phone is required'], 422);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'An error occurred', 'error' => $th->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
