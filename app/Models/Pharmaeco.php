<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmaeco extends Model
{
    /**
     * @var string
     */
    public $table = 'pharmaecos';

    /**
     * @var array
     */
    public $fillable = [
        'disease_id',
        'cost_treatment'
    ];

    /**
     * @var array
     */
    public $visible = [
        'disease_id',
        'cost_treatment',

        'disease'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function disease()
    {
        return $this->belongsTo(Disease::class);
    }
}
