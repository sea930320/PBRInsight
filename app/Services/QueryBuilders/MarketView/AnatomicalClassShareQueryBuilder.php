<?php

namespace App\Services\QueryBuilders\MarketView;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class AnatomicalClassShareQueryBuilder extends BaseBuilder
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
        if (isset($params['drug_form_id'])) {
            $this->query->where('drug_form_id', $params['drug_form_id']);
        }
        return $this->query;
    }
}