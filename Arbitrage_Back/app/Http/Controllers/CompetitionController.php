<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\competition;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    public function index()
    {
        $competitions = Competition::all();
        return $competitions;
    }
}
