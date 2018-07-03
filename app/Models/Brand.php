<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    /**
     * @var string
     */
    public $table = 'brands';
    
    /**
     * @var array
     */
    public $fillable = ['name', 'description'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'name',
        'description'
    ];
}
