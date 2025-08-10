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