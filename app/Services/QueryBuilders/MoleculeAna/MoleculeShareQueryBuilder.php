<?php

namespace App\Services\QueryBuilders\MoleculeAna;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class MoleculeShareQueryBuilder extends BaseBuilder
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
        if (isset($params['atc1_id'])) {
            $this->query->where('atc1_id', $params['atc1_id']);
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