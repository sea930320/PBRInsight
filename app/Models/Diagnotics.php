<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diagnotics extends Model
{
    /**
     * @var string
     */
    public $table = 'diagnotics';

    /**
     * @var array
     */
    public $fillable = ['period', 'classification', 'sub_analysis_1', 'sub_analysis_2', 'facility_type', 'clinic_type_id'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'period',
        'classification',
        'sub_analysis_1',
        'sub_analysis_2',
        'facility_type',
        'clinic_type_id',

        'clinic_type'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function clinic_type()
    {
        return $this->belongsTo(ClinicType::class, 'clinic_type_id');
    }
}
