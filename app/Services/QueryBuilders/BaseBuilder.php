<?php
namespace App\Services\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;

abstract class BaseBuilder implements IQueryBuilder
{
    /**
     * @var Builder
     */
    protected $query;

    public function setQuery(Builder $query): IQueryBuilder
    {
        $this->query = $query;

        return $this;
    }
}