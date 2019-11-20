<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKundenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kunden', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();

            $table->string('anrede')->nullable();
            $table->string('name')->nullable();
            $table->string('strasse')->nullable();
            $table->string('plz')->nullable();
            $table->string('ort')->nullable();
            $table->string('jahreszeit')->nullable();
            $table->string('wuensche')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kunden');
    }
}
