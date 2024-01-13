<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Delegue;
use Illuminate\Http\Request;

class delegueController extends Controller
{
    public function index()
    {
        $delegue = Delegue::with('Ville')->get();
        return $delegue;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $delegue = Delegue::create($request->all());
        return [
            "status" => true,
            "data" => $delegue
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $delegue = Delegue::find($id);
        $delegue->update($request->all());
        return [
            "status" => true,
            "data" => $delegue
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delegue = Delegue::find($id);
        $delegue->delete();
    }
}
