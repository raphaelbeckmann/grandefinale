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
Route::get('react/{view?}', 'KundenFrontendController@index')->where('view', '(.*)')->name('react');
Route::post('api/store', 'KundenApiController@store')->name('api.store');
Route::get('api/show/{kunde}', 'KundenApiController@show')->name('api.show');
Route::get('api/list', 'KundenApiController@list')->name('api.list');
