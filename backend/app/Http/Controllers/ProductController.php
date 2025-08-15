<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function store(Request $request)
{
    try {
        $data = $request->validate([
            'product_id' => 'nullable|string',
            'product_name' => 'required|string|max:255',
            'quantity' => 'nullable|numeric|min:0',
            'price_per_kg' => 'required|numeric|min:0',
            'total_value' => 'nullable|numeric|min:0',
            'seeds_used' => 'nullable|numeric|min:0',
            'fertilizer_used' => 'nullable|numeric|min:0',
            'buyer_name' => 'nullable|string|max:255',
            'sales_date' => 'nullable|date',
        ]);

        $product = Product::create($data);
        return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['error' => 'Validation failed', 'details' => $e->errors()], 422);
    } catch (\Exception $e) {
        \Log::error('Error saving product: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to save product', 'details' => $e->getMessage()], 500);
    }
}
}