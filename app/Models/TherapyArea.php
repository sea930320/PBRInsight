<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TherapyArea extends Model
{
    /**
     * @var string
     */
    public $table = 'therapy_areas';
    
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
        'description',

        'diseases'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function diseases()
    {
        return $this->hasMany(Disease::class, 'therapy_area_id');
    }
}
