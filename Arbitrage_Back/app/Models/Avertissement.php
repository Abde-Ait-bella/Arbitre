<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avertissement extends Model
{
    use HasFactory;
    public function matche()
    {
        return $this->belongsTo(Matche::class);
    }

    protected $table = 'avertissemets';
    protected $fillable = [
        'type',
        'club_id',
        'nom',
        'joueur_numero_licence',
        'joueur_numero',
        'minute',
        'cause',
        'matche_id'
    ];
}
