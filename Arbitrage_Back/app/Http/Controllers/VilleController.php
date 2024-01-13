<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::all();
        return $villes;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ville = Ville::create($request->all());
        return [
            "status" => true,
            "data" => $ville
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ville = Ville::find($id);
        $ville->update($request->all());
        return [
            "status" => true,
            "data" => $ville
        ];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $ville = Ville::find($id);
         $ville->delete();

    }
}
