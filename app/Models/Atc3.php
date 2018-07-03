<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atc3 extends Model
{
    /**
     * @var string
     */
    public $table = 'atc3s';
    
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
