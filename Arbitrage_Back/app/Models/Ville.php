<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'user_id',
    ];

    public function club(){
        return $this->hasMany(Club::class);
    }
    public function delegue(){
        return $this->hasMany(Delegue::class);
    }
    public function stade(){
        return $this->hasMany(Stade::class);
    }
    public function matche(){
        return $this->hasMany(Matche::class);
    }
}
