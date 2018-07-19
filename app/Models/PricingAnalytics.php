<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingAnalytics extends Model
{
    /**
     * @var string
     */
    public $table = 'pricing_analytics';
    
    /**
     * @var array
     */
    public $fillable = [
        'period',
        'active_constituent',
        'brand_id',
        'wholesale_price',
        'retail_pharmacy_price',
        'hosptial_price',
        'atc5_id',
        'atc4_id',
        'atc3_id',
        'atc2_id'
    ];

    /**
     * @var array
     */
    public $visible = [
        'period',
        'active_constituent',
        'brand_id',
        'wholesale_price',
        'retail_pharmacy_price',
        'hosptial_price',
        'atc5_id',
        'atc4_id',
        'atc3_id',
        'atc2_id',

        'brand',
        'atc5',
        'atc4',
        'atc3',
        'atc2'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function atc5()
    {
        return $this->belongsTo(Atc5::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function atc4()
    {
        return $this->belongsTo(Atc4::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function atc3()
    {
        return $this->belongsTo(Atc3::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function atc2()
    {
        return $this->belongsTo(Atc2::class);
    }
}
