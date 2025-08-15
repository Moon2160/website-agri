<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
 

    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_id')->nullable();
            $table->string('product_name');
            $table->decimal('quantity', 8, 2)->nullable();
            $table->decimal('price_per_kg', 8, 2);
            $table->decimal('total_value', 10, 2)->nullable();
            $table->decimal('seeds_used', 8, 2)->nullable();
            $table->decimal('fertilizer_used', 8, 2)->nullable();
            $table->string('buyer_name')->nullable();
            $table->date('sales_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
