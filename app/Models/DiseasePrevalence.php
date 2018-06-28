<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiseasePrevalence extends Model
{
    /**
     * @var string
     */
    public $table = 'disease_prevalences';
    
    /**
     * @var array
     */
    public $fillable = [
        'patient',
        'period',
        'active_constituent',
        'brand_id',
        'clinic_type_id',
        'therapy_area_id',
        'disease_id',
        'atc5_id',
        'atc4_id',
        'atc3_id',
        'atc2_id'
    ];

    /**
     * @var array
     */
    public $visible = [
        'patient',
        'period',
        'active_constituent',
        'brand_id',
        'clinic_type_id',
        'therapy_area_id',
        'disease_id',
        'atc5_id',
        'atc4_id',
        'atc3_id',
        'atc2_id',

        'disease',
        'clinic_type',
        'therapy_area'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function clinic_type()
    {
        return $this->belongsTo(ClinicType::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function therapy_area()
    {
        return $this->belongsTo(TherapyArea::class);
    }
}
