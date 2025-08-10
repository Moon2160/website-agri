<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class Farmer extends Authenticatable
{
    use HasFactory, HasApiTokens;

    // protected $table = 'farmers';

    protected $fillable = ['name', 'phone', 'password'];

    /**
     * Automatically hash the password when storing.
     */
    // public function setPasswordAttribute($value)
    // {
    //   $this->attributes['password'] = Hash::make($value);
    // }
}