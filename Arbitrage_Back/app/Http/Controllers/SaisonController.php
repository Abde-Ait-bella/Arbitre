<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Saison;
use Illuminate\Http\Request;

class SaisonController extends Controller
{
    public function index()
    {
        $saisons = Saison::all();
        return $saisons;
    }
}
