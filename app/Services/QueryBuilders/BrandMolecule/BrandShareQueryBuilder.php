<?php

namespace App\Services\QueryBuilders\BrandMolecule;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class BrandShareQueryBuilder extends BaseBuilder
{
    /**
     * @param array $params
     *
     * @return Builder
     */
    public function setQueryParams(array $params): Builder
    {   
        if (isset($params['disease_id'])) {
            $this->query->where('disease_id', $params['disease_id']);
        }
        
        if (isset($params['therapy_area_id'])) {
            $this->query->whereHas('disease.therapy_area', function ($query) use ($params) {
                $query->where('id', $params['therapy_area_id']);
            });
        }

        if (isset($params['clinic_type_id'])) {
            $this->query->where('clinic_type_id', $params['clinic_type_id']);
        }
        
        if (isset($params['start_year'])) {
            $this->query->where(function($query) use ($params) {
                $query->where('period', 'like', "%{$params['start_year']}%");
                if (isset($params['start_quarater'])) {
                    $query->where('period', '>=', "Q{$params['start_quarater']} {$params['start_year']}");
                }
                if (isset($params['end_year'])) {
                    if ($params['end_year'] == $params['start_year']) {
                        if (isset($params['end_quarater'])) {
                            $endPeriod = 'Q'. $params['end_quarater']. " ". $params['end_year'];
                        } else {
                            $endPeriod = 'Q4 '. $params['end_year'];
                        }
                        $query->where('period', '<=', $endPeriod);
                    } else {
                        $startYear = $params['start_year'] + 1;
                        if (isset($params['end_quarater'])) {
                            $endYear = $params['end_year'] -1 ;
                            $query->orWhere('period', 'like', "%{$params['end_year']}%")
                                ->where('period', '<=', "Q{$params['end_quarater']} {$params['end_year']}");
                        } else {
                            $endYear = $params['end_year'];
                        }
                        while ($startYear <= $endYear) {
                            $query->orWhere('period', 'like', "%{$startYear}%");
                            $startYear++;
                        }
                    }
                } else {
                    $startYear = $params['start_year'] + 1;
                    $endYear = date("Y");
                    while ($startYear <= $endYear) {
                        $query->orWhere('period', 'like', "%{$startYear}%");
                        $startYear++;
                    }
                }
            });
        }
        return $this->query;
    }
}