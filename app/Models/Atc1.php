<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atc1 extends Model
{
    /**
     * @var string
     */
    public $table = 'atc1s';
    
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
