<?php

use Illuminate\Support\Facades\Route;

// Musterlösung
Route::any('musterloesung', function () {
    return view('musterloesung');
});


// MVC-Lösung
Route::get('create', 'KundenController@create')->name('create');
Route::post('store', 'KundenController@store')->name('store');
Route::get('show/{kunde}', 'KundenController@show')->name('show');
Route::get('list', 'KundenController@list')->name('list');


// MVC-API-Lösung
Route::post('store', 'KundenApiController@store')->name('store');
Route::get('show/{kunde}', 'KundenApiController@show')->name('show');
Route::get('list', 'KundenApiController@list')->name('list');
