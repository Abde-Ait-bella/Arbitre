<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Stade;
use Illuminate\Http\Request;

class StadeController extends Controller
{
    public function index()
    {
        $stades = Stade::with('Ville')->get();
        return $stades;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $stade = Stade::create($request->all());

        $stade = new Stade();

        $stade->nom = $request->nom;
        $stade->ville_id = $request->ville_id;
        $stade->user_id = $request->user_id;
        $stade->save();

        return [
            "status" => true,
            "data" => $stade
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $stade = Stade::find($id);
        $stade->update($request->all());
        return [
            "status" => true,
            "data" => $stade
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $stade = Stade::find($id);
         $stade->delete();

    }
}
