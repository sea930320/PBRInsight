<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketData extends Model
{
    /**
     * @var string
     */
    public $table = 'market_datas';
    
    /**
     * @var array
     */
    public $fillable = [
        'brand_id',
        'year',
        'company_id',
        'generic_name_id',
        'atc5_id',
        'atc4_id',
        'atc2_id',
        'atc1_id',
        'drug_form_id',
        'country',
        'volumn',
        'value'
    ];

    /**
     * @var array
     */
    public $visible = [
        'brand_id',
        'year',
        'company_id',
        'generic_name_id',
        'atc5_id',
        'atc4_id',
        'atc2_id',
        'atc1_id',
        'drug_form_id',
        'country',
        'volumn',
        'value',

        'brand',
        'company',
        'generic_name',
        'atc5',
        'atc4',
        'atc2',
        'atc1',
        'drug_form'
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
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function generic_name()
    {
        return $this->belongsTo(GenericName::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function drug_form()
    {
        return $this->belongsTo(DrugForm::class);
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
    public function atc2()
    {
        return $this->belongsTo(Atc2::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function atc1()
    {
        return $this->belongsTo(Atc1::class);
    }
}
