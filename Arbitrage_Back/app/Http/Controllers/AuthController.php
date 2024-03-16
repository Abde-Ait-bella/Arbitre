<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function checkAuth(Request $request)
    {
        $user = Auth::user();

        // Check if the user is authenticated
        if ($request->user()) {
            return response()->json(['isAuthenticated' => $user]);
        } else {
            return response()->json(['isAuthenticated' => $user]);
        }
    }
}
