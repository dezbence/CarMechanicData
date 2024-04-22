<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = "car";

    protected $fillable =[
        'brand',
        'type',
        'owner',
        'license_number',
        'user_id'
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function repairs(){
        return $this->hasMany(Repair::class);
    }
}
