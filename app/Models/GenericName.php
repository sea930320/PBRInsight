<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GenericName extends Model
{
    /**
     * @var string
     */
    public $table = 'generic_names';
    
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
