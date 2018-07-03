<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgeGroup extends Model
{
    /**
     * @var string
     */
    public $table = 'age_groups';
    
    /**
     * @var array
     */
    public $fillable = ['range'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'range'
    ];
}
