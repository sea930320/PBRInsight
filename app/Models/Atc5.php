<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atc5 extends Model
{
    /**
     * @var string
     */
    public $table = 'atc5s';
    
    /**
     * @var array
     */
    public $fillable = ['name'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'name'
    ];
}
