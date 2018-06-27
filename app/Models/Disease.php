<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    /**
     * @var string
     */
    public $table = 'diseases';

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
