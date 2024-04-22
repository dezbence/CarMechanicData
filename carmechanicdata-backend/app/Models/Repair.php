<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;

    protected $table = "repair";

    protected $fillable =[
        'date',
        'wage',
        'tip',
        'afa',
        'car_id'
    ];

    public $timestamps = false;

    public function car() {
        return $this->belongsTo(Car::class, 'car_id', 'id');
    }

    public function parts(){
        return $this->hasMany(Part::class);
    }

}
