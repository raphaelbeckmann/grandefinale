<?php

use Illuminate\Support\Facades\Route;

// MVC-Lösung
Route::get('formular', 'KundenController@formular')->name('formular');
Route::post('daten-speichern', 'KundenController@datenSpeichern')->name('daten-speichern');
Route::get('daten-gespeichert/{kunde}', 'KundenController@datenGespeichert')->name('daten-gespeichert');
Route::get('kunden', 'KundenController@kunden')->name('kunden');

// Musterlösung
Route::any('musterloesung', function() {
    return view('musterloesung');
});
