<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Arbitre;
use Illuminate\Http\Request;

class ArbitreController extends Controller
{
    public function index()
    {
        $arbitres = Arbitre::with('ville')->get();
        return $arbitres;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $arbitre = Arbitre::create($request->all());
        return [
            "status" => true,
            "data" => $arbitre
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $arbitre = Arbitre::find($id);
        $arbitre->update($request->all());
        return [
            "status" => true,
            "data" => $arbitre
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $arbitre = Arbitre::find($id);
        $arbitre->delete();
    }
}
