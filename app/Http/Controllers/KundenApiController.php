<?php

namespace App\Http\Controllers;

use App\Models\Kunde;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KundenApiController extends Controller
{
    public function create(Request $request)
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

        return response()->json([
            'id' => $kunde->id,
        ]);
    }

    public function show(Kunde $kunde)
    {
        return response()->json([
            'id'         => $kunde->id,
            'anrede'     => $kunde->anrede,
            'name'       => $kunde->name,
            'strasse'    => $kunde->strasse,
            'plz'        => $kunde->plz,
            'ort'        => $kunde->ort,
            'jahreszeit' => $kunde->jahreszeit,
            'wuensche'   => $kunde->wuensche,
        ]);
    }

    public function list()
    {
        $kunden = Kunde::all();

        return response()->json(
            $kunden->map(function ($kunde) {
                return [
                    'id'         => $kunde->id,
                    'anrede'     => $kunde->anrede,
                    'name'       => $kunde->name,
                    'strasse'    => $kunde->strasse,
                    'plz'        => $kunde->plz,
                    'ort'        => $kunde->ort,
                    'jahreszeit' => $kunde->jahreszeit,
                    'wuensche'   => $kunde->wuensche,
                ];
            })
        );
    }
}
