<?php

namespace App\ApiPlatform;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;

class SubscriptionFilter extends AbstractFilter
{
    /**
     * Passes a property through the filter.
     */
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null/*, array $context = []*/)
    {

        if ($property == 'experience') {
            $alias = $queryBuilder->getRootAliases()[0];
            $valueParameter = $queryNameGenerator->generateParameterName('experience');
            $searchValues = explode(" ", $value);
            foreach ($searchValues as $key => $val) {
                $queryBuilder
                    ->leftJoin(sprintf('%s.experience', $alias), 'experience')->addSelect('experience')
                    // ->andWhere('experience = 2')
                    ->andWhere(sprintf('experience = :%s ',$valueParameter.$key))
                    ->setParameter($valueParameter.$key,  $val );
                
               
            }
        } else
            return;
    }

    /**
     * Gets the description of this filter for the given resource.
     *
     * Returns an array with the filter parameter names as keys and array with the following data as values:
     *   - property: the property where the filter is applied
     *   - type: the type of the filter
     *   - required: if this filter is required
     *   - strategy (optional): the used strategy
     *   - is_collection (optional): is this filter is collection
     *   - swagger (optional): additional parameters for the path operation,
     *     e.g. 'swagger' => [
     *       'description' => 'My Description',
     *       'name' => 'My Name',
     *       'type' => 'integer',
     *     ]
     *   - openapi (optional): additional parameters for the path operation in the version 3 spec,
     *     e.g. 'openapi' => [
     *       'description' => 'My Description',
     *       'name' => 'My Name',
     *       'schema' => [
     *          'type' => 'integer',
     *       ]
     *     ]
     * The description can contain additional data specific to a filter.
     *
     * @see \ApiPlatform\Core\Swagger\Serializer\DocumentationNormalizer::getFiltersParameters
     */
    public function getDescription(string $resourceClass): array
    {
        return [

            'experience' => [
                'property' => null,
                'type' => 'integer',
                'required' => false,
                'openapi' => [
                    'description' => 'Search by Experience',
                ],
            ]
        ];
    }
}
