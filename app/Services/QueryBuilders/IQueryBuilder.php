<?php
namespace App\Services\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;

interface IQueryBuilder
{
    /**
     * @param array $params
     *
     * @return Builder
     */
    public function setQueryParams(array $params): Builder;
}