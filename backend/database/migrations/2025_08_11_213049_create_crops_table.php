<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('crops', function (Blueprint $table) {
            $table->id();
            $table->string('crops_name');
            $table->string('type');
            $table->date('date');
            $table->date('date_expected_harvest');
            $table->float('amount_planted');
            $table->string('status');
            $table->text('notes')->nullable();
            $table->string('crop_image')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('crops');
    }
};