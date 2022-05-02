<?php

namespace App\Repository;

use App\Entity\Experience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Experience|null find($id, $lockMode = null, $lockVersion = null)
 * @method Experience|null findOneBy(array $criteria, array $orderBy = null)
 * @method Experience[]    findAll()
 * @method Experience[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExperienceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Experience::class);
    }

    public function getExperiences($criterias, $items_per_page, $offset)
    {

        $sort =  $criterias["sort_by"];
        $order = $criterias["order_by"];
        $q = $this->createQueryBuilder('exp');
        foreach ($criterias["where"] as $criteria) {
            $q->andWhere($criteria);
        }
        foreach ($criterias["params"] as $key => $param) {
            $q->setParameter($key, $param);
        }
        $q->setFirstResult($offset);
        $q->setMaxResults($items_per_page);
        $q->addOrderBy("exp.$sort", $order);
        // $q->add('where', 'exp.nbr_participant < :nbr_participant');
        // $q->setParameter('nbr_participant', 20);
        // ->setFirstResult($offset)
        // ->setMaxResults($items_per_page)
        // ->addOrderBy($sort, $order);

        echo ($q->getQuery()->getSql());
        exit;
        return $q->getQuery()->getResult();
    }
}
