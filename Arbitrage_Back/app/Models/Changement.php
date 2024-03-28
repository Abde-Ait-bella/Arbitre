<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Changement extends Model
{
    use HasFactory;

    protected $fillable = [
        'joueur_nom_sort',
        'joueur_pre_sort',
        'joueur_num_sort',
        'joueur_licence_sort',
        'joueur_nom_entr',
        'joueur_pre_entr',
        'joueur_num_entr',
        'joueur_licence_entr',
        "club_id",
        "cause",
        "minute",
        "matche_id"
    ];
    public function club(){
        return $this->belongsTo(Club::class);
    }

}
