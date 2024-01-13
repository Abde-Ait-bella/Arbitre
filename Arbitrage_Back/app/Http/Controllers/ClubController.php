<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $club = Club::with('Stade', 'Stade.Ville')->get();
        return $club;
    }
     /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $club = Club::create($request->all());
        return [
            "status" => true,
            "data" => $club
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $club = Club::find($id);
        $club->update($request->all());
        return [
            "status" => true,
            "data" => $club
        ];
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    public function destroy(string $id)
    {
         $club = Club::find($id);
         $club->delete();

    }
}
