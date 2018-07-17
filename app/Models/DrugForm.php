<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DrugForm extends Model
{
    /**
     * @var string
     */
    public $table = 'drug_forms';
    
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
