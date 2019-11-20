<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kunde extends Model
{
    protected $table = 'Kunden';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'anrede',
        'name',
        'strasse',
        'plz',
        'ort',
        'jahreszeit',
        'wuensche',
    ];
}
