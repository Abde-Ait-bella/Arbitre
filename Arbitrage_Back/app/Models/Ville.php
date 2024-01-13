<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
    ];

    public function club(){
        return $this->hasMany(club::class);
    }
    public function delegue(){
        return $this->hasMany(delegue::class);
    }
    public function stade(){
        return $this->hasMany(stade::class);
    }
    public function matche(){
        return $this->hasMany(matche::class);
    }
}
