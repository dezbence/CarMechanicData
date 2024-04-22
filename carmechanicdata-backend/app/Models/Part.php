<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $table = "part";

    protected $fillable =[
        'name',
        'article_number',
        'buying_price',
        'selling_price',
        'repair_id'
    ];

    public $timestamps = false;

    public function repair() {
        return $this->belongsTo(Repair::class, 'repair_id', 'id');
    }
}
