<?php

namespace App\Services\QueryBuilders\MarketView;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class MarketShareQueryBuilder extends BaseBuilder
{
    /**
     * @param array $params
     *
     * @return Builder
     */
    public function setQueryParams(array $params): Builder
    {  
        if (isset($params['year'])) {
            $this->query->where('year', $params['year']);
        }

        return $this->query;
    }
}