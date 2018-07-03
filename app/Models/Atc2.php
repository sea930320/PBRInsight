<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atc2 extends Model
{
    /**
     * @var string
     */
    public $table = 'atc2s';
    
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
