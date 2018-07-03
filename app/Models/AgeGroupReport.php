<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgeGroupReport extends Model
{
    /**
     * @var string
     */
    public $table = 'age_group_reports';
    
    /**
     * @var array
     */
    public $fillable = ['age_group_id', 'male', 'female', 'total'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'age_group_id',
        'male',
        'female',
        'total',

        'age_group'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function age_group()
    {
        return $this->belongsTo(AgeGroup::class, 'age_group_id');
    }
}
