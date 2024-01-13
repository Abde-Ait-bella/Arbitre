<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class But extends Model
{
    use HasFactory;

    protected $fillable = ['club_id', 'joueur_nom','joueur_pre', 'joueur_numero_licence', 'joueur_numero', 'minute', 'matche_id'];

    public function club(){
        return $this->belongsTo(club::class);
    }
}
