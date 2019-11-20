<?php

use Illuminate\Support\Facades\Route;

// MVC-Lösung
Route::get('form', 'KundenController@form')->name('form');
Route::post('create', 'KundenController@create')->name('create');
Route::get('show/{kunde}', 'KundenController@show')->name('show');
Route::get('list', 'KundenController@list')->name('list');

// Musterlösung
Route::any('musterloesung', function() {
    return view('musterloesung');
});
