<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_id',
        'product_name',
        'quantity',
        'price_per_kg',
        'total_value',
        'seeds_used',
        'fertilizer_used',
        'buyer_name',
        'sales_date',
    ];

    protected $dates = ['sales_date'];
}