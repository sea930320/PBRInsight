<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * @var string
     */
    public $table = 'companies';
    
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
