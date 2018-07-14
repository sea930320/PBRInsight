<?php

namespace App\Services\QueryBuilders\Diagnotics;

use App\Services\QueryBuilders\BaseBuilder;
use Illuminate\Database\Eloquent\Builder;

class DiagnoticsQueryBuilder extends BaseBuilder
{
    /**
     * @param array $params
     *
     * @return Builder
     */
    public function setQueryParams(array $params): Builder
    {
        if (isset($params['classification'])) {
            $this->query->where('classification', $params['classification']);
        }
        if (isset($params['sub_analysis_1'])) {
            $this->query->where('sub_analysis_1', $params['sub_analysis_1']);
        }
        if (isset($params['sub_analysis_2'])) {
            $this->query->where('sub_analysis_2', $params['sub_analysis_2']);
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