<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class siason extends Model
{
    use HasFactory;
    public function matche(){
        return $this->haseMany(matche::class);
    }
}
