<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stade extends Model
{
    use HasFactory;

    public function Ville(){
        return $this->belongsTo(ville::class);
    }
    public function Clube(){
        return $this->hasMany(Club::class);
    }

    protected $fillable = [
        'nom',
        'ville_id'
    ];

}
