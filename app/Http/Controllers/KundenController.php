<?php

namespace App\Http\Controllers;

use App\Models\Kunde;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class KundenController extends Controller
{
    public function formular()
    {
        return view('infomaterial-bestellformular');
    }

    public function datenSpeichern(Request $request)
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

        return redirect()->route('daten-gespeichert', $kunde);
    }

    public function datenGespeichert(Kunde $kunde)
    {
        return view('daten-gespeichert', ['kunde' => $kunde]);
    }

    public function kunden()
    {
        $kunden = Kunde::all();

        return view('kunden', ['kunden' => $kunden]);
    }
}
