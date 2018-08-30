<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RssUrl extends Model
{
    /**
     * @var string
     */
    public $table = 'rss_urls';
    
    /**
     * @var array
     */
    public $fillable = ['url'];
    
    /**
     * @var array
     */
    public $visible = [
        'id',
        'url'
    ];
}
