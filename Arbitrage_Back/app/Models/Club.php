<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'ville_id',
        'abbr',
        'stade_id',
        'user_id'
    ];

    public function ville(){
        return $this->belongsTo(ville::class);
    }
    public function Stade(){
        return $this->belongsTo(Stade::class);
    }
}
