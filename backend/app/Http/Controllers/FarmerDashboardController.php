<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FarmerDashboardController extends Controller
{
    public function show(Request $request)
    {
        $farmer = $request->user(); // Authenticated farmer

        return response()->json([
            'profile' => $farmer,
            'products' => $farmer->products,
            'stats' => [
                'total_sales' => $farmer->sales()->count(),
                'best_product' => $farmer->products()->orderBy('sales', 'desc')->first(),
            ],
            'ratings' => $farmer->ratings,
        ]);
    }
}