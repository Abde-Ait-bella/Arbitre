<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\But;
use App\Models\Joueur;
use Illuminate\Http\Request;

class ButsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buts = But::all();

        return $buts;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $buts = $request->all();

        foreach ($buts as $but) {
            But::create($but);
            $joueur = Joueur::where('joueur_numero_licence', $request->joueur_numero_licence)->get()->all();
            if (!$joueur) {
                $j = new Joueur();
                $j->joueur_nom = $request->joueur_nom;
                $j->joueur_pre = $request->joueur_pre;
                $j->joueur_numero_licence = $request->joueur_numero_licence;
                $j->joueur_numero = $request->joueur_numero;
                $j->save();
            }
        }


        return [
            "status" => true,
            "data" => $but,
            "joueur" => $joueur,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updatedButs = $request->all();
        $ids = collect($updatedButs)->pluck('id')->filter(); // Remove null values

        $buts = But::where('matche_id' , $id);

        if ($ids) {
            $buts->whereNotIn('id', $ids)->delete();
        }

        foreach ($updatedButs as $updatedBut) {

            if (isset($updatedBut['id'])) {
                $But = But::find($updatedBut['id']);
                if ($But) {
                    $But->update($updatedBut);
                } else {
                    But::create($updatedBut);
                }
            } else {
                But::create($updatedBut);
            }

            if (isset($updatedBut['joueur_numero_licence'])) {

                $joueur = Joueur::where('joueur_numero_licence', $updatedBut['joueur_numero_licence'])->first();

                if ($joueur) {
                    $joueur->nom = $updatedBut['joueur_nom'];
                    $joueur->joueur_numero_licence = $updatedBut['joueur_numero_licence'];
                    $joueur->joueur_numero = $updatedBut['joueur_numero'];
                    $joueur->save();
                } else {
                    $j = new Joueur();
                    $j->nom = $updatedBut['joueur_nom'];
                    $j->joueur_numero_licence = $updatedBut['joueur_numero_licence'];
                    $j->joueur_numero = $updatedBut['joueur_numero'];
                    $j->save();
                }
            }
        }

        return [
            "status" => true,
            "data" => $updatedButs
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $but = But::find($id);
        $but->delete();
        return [
            "status" => true
        ];
    }
}
