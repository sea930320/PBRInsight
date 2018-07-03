<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Population extends Model
{
    /**
     * @var string
     */
    public $table = 'populations';
    
    /**
     * @var array
     */
    public $fillable = ['year', 'total_population', 'annual_growth_rate'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'year',
        'total_population',
        'annual_growth_rate'
    ];
}
