<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.comn',
            'phone' => '0987654321',
            'password' => 'password',
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Farmer',
            'phone' => '1234567890',
            'password' => 'password',
            'role' => 'farmer',
        ]);

        User::create([
            'name' => 'Buyer',
            'password' => 'password',
            'email' => 'buyer@gmail.comn',
            'role' => 'buyer',
        ]);
    }
}
