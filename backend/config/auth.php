<?php

return [

    // ✅ Default authentication settings
    'defaults' => [
        'guard' => 'farmer', // ✅ Set default guard to farmer (Change as needed)
        'passwords' => 'farmers',
    ],

    'defaults' => [
        'guard' => 'buyer', // ✅ Set default guard to farmer (Change as needed)
        'passwords' => 'buyers',
    ],

    // ✅ Define authentication guards
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'farmer' => [ // ✅ Added farmer authentication guard
            'driver' => 'session',
            'provider' => 'farmers',
        ],

        'buyer' => [ // ✅ Buyer authentication guard
            'driver' => 'session',
            'provider' => 'buyers',
        ],

    ],

    // ✅ Define authentication providers
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'farmers' => [ // ✅ Added farmer provider
            'driver' => 'eloquent',
            'model' => App\Models\Farmer::class,
        ],

        'buyers' => [ // ✅ Buyer provider
            'driver' => 'eloquent',
            'model' => App\Models\Buyer::class,
        ],

    ],

    // ✅ Password reset settings
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'farmers' => [ // ✅ Added farmer password reset support
            'provider' => 'farmers',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

         'buyers' => [ // ✅ Buyer password reset
            'provider' => 'buyers',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

    ],

    // ✅ Password confirmation timeout
    'password_timeout' => 10800,

];

