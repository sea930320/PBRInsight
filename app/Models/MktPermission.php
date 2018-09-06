<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MktPermission extends Model
{
    /**
     * @var string
     */
    public $table = 'mkt_permissions';
    
    /**
     * @var array
     */
    public $fillable = ['user_id', 'total_market_view', 'therapy_area_ana', 'brand_ana', 'molecule_ana'];

    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'user_id',
        'total_market_view',
        'therapy_area_ana',
        'brand_ana',
        'molecule_ana'
    ];

    /**
     * The users that belong to the therapy_area.
     */
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
