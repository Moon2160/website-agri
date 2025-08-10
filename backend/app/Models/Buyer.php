<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable; // ✅ Correct import for authentication
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class Buyer extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = ['name', 'email', 'password'];

   
}