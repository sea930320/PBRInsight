<?php

namespace App\Services\QueryBuilders\MoleculePrice;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class AvgPriceQueryBuilder extends BaseBuilder
{
    /**
     * @param array $params
     *
     * @return Builder
     */
    public function setQueryParams(array $params): Builder
    {  
        if (isset($params['year'])) {
            if (isset($params['quarater'])) {
                $this->query->where('period', "Q{$params['quarater']} {$params['year']}");
            } else {
                $this->query->where('period', 'like', "%{$params['year']}%");
            }
        }
        if (isset($params['atc4_id'])) {
            $this->query->where('atc4_id', $params['atc4_id']);
        }
        if (isset($params['atc5_id'])) {
            $this->query->where('atc5_id', $params['atc5_id']);
        }
        return $this->query;
    }
}