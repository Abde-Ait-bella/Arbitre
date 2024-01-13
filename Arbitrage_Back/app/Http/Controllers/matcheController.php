<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class matcheController extends Controller
{

    public function index()
    {
        $matche = Matche::with(['stade.ville', 'ville', 'delegue.ville', 'competition', 'saison'])->get();
        return $matche;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $matche = matche::create($request->all());
        return [
            "status" => true,
            "data" => $matche
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $matche = Matche::find($id);
        $matche->update($request->all());
        return [
            "status" => true,
            "data" => $matche
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $matche = Matche::find($id);
         $matche->delete();

    }

}
