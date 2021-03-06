<?php

namespace App\Http\Controllers;

use App\Models\Kunde;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KundenController extends Controller
{
    public function list()
    {
        $kunden = Kunde::all();

        return view('list', ['kunden' => $kunden]);
    }

    public function show(Kunde $kunde)
    {
        return view('show', ['kunde' => $kunde]);
    }

    public function create()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        $validatedRequest = Validator::make($request->all(), [
            'anrede'     => 'in:Frau,Herr,Familie',
            'name'       => 'required|max:255',
            'strasse'    => 'required|max:255',
            'plz'        => 'numeric',
            'ort'        => 'required|max:255',
            'jahreszeit' => 'in:Sommer,Winter',
            'wuensche'   => '',
        ])->validate();

        $kunde = Kunde::create($validatedRequest);

        return redirect()->route('show', $kunde);
    }
}
