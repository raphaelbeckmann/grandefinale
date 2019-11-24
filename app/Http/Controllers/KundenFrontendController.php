<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KundenFrontendController extends Controller
{
    public function index()
    {
    	return view('react');
    }
}
