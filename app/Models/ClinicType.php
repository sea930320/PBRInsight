<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicType extends Model
{
    /**
     * @var string
     */
    public $table = 'clinic_types';
    
    /**
     * @var array
     */
    public $fillable = ['name', 'description', '2017_multiply'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'name',
        'description',
        '2017_multiply'
    ];
}
