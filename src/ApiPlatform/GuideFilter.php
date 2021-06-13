<?php

    namespace App\ApiPlatform;

    use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
    use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
    use Doctrine\ORM\QueryBuilder;

    class GuideFilter extends AbstractFilter
    {
        /**
         * Passes a property through the filter.
         */
        protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null/*, array $context = []*/)
        {

            if ($property == 'all') {
                $alias = $queryBuilder->getRootAliases()[0];
                $valueParameter = $queryNameGenerator->generateParameterName('all');
                $searchValues = explode(" ", $value);
                foreach ($searchValues as $key=>$val){
                $queryBuilder->andWhere(sprintf('%s.nom LIKE :%s OR %s.prenom LIKE :%s OR %s.description LIKE :%s', $alias, $valueParameter.$key, $alias, $valueParameter.$key, $alias, $valueParameter.$key))
                    ->setParameter($valueParameter.$key, '%' . $val . '%');
                }

            } elseif ($property == 'fullName') {
                $alias = $queryBuilder->getRootAliases()[0];
                $valueParameter = $queryNameGenerator->generateParameterName('fullName');
                $searchValues = explode(" ", $value);
                foreach ($searchValues as $key=>$val){
                    $queryBuilder->andWhere(sprintf('%s.nom LIKE :%s OR %s.prenom LIKE :%s', $alias, $valueParameter.$key, $alias, $valueParameter.$key))
                        ->setParameter($valueParameter.$key, '%' . $val . '%');
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
                'all' => [
                    'property' => null,
                    'type' => 'string',
                    'required' => false,
                    'openapi' => [
                        'description' => 'Search across multiple fields',
                    ],
                ],
                'fullName' => [
                    'property' => null,
                    'type' => 'string',
                    'required' => false,
                    'openapi' => [
                        'description' => 'Search fullName',
                    ],
                ]
            ];
        }
    }