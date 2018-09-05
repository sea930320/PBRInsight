<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTherapyAreaForPF;

class TherapyAreaForPF extends Model
{
    use BelongsToTherapyAreaForPF;
    
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

        'diseases',
        'users',
        'pivot'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function diseases()
    {
        return $this->hasMany(Disease::class, 'therapy_area_id');
    }

    /**
     * The users that belong to the therapy_area.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'therapy_area_user');
    }
}