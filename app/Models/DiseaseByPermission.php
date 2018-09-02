<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToTherapyArea;

class DiseaseByPermission extends Model
{
    use BelongsToTherapyArea;
    
    /**
     * @var string
     */
    public $table = 'diseases';

    /**
     * @var array
     */
    public $fillable = ['name', 'description', 'therapy_area_id'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'name',
        'description',
        'therapy_area_id',

        'therapy_area'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function therapy_area()
    {
        return $this->belongsTo(TherapyArea::class, 'therapy_area_id');
    }
}
