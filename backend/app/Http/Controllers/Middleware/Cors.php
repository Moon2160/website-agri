<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
 {
    /**
    * Handle an incoming request.
    */

    public function handle( Request $request, Closure $next )
 {
        //
        // if ( $request->getMethod() === 'OPTIONS' ) {
        //     return response()->json( 'OK', 200, [
        //         'Access-Control-Allow-Origin' => '*',
        //         'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
        //         'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
        // ] );
        // }

        // // Then continue normal requests
        // $response = $next( $request );

        // $response->header( 'Access-Control-Allow-Origin', '*' );
        // $response->header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
        // $response->header( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );

        // return $response;

        if ( $request->getMethod() === 'OPTIONS' ) {
            return response()->json( 'OK', 200, [
                'Access-Control-Allow-Origin' => 'http://localhost:3000',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization'
            ] );
        }

        $response = $next( $request );

        $response->header( 'Access-Control-Allow-Origin', 'http://localhost:3000' );
        $response->header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
        $response->header( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );

        return $response;
    }
}

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // React frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];


return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];