<?php

namespace App\Repository;

use App\Entity\Experience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Query\Parameter;
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

        $sort =  key_exists("sort_by", $criterias) ? $criterias["sort_by"]  : "id";
        $order = key_exists("order_by", $criterias) ? $criterias["order_by"]  : "DESC";
        $q = $this->createQueryBuilder('exp');
        $q_count = $this->createQueryBuilder('exp')->select('count(exp.id) as total');

        $wheres = key_exists("where", $criterias) ? $criterias["where"] : [];
        foreach ($wheres as $criteria) {
            $q->andWhere($criteria);
            $q_count->andWhere($criteria);
        }

        $parametres = new ArrayCollection();
        $params = key_exists("params", $criterias) ? $criterias["params"] : [];
        foreach ($params as $key => $param) {
            $parametres->add(new Parameter($key, $param[0], $param[1]));
        }

        $q->setParameters($parametres);
        $q_count->setParameters($parametres);
        $q->setFirstResult($offset);
        $q->setMaxResults($items_per_page);
        $q->addOrderBy("$sort", $order);
        // $q->add('where', 'exp.nbr_participant < :nbr_participant');
        // $q->setParameter('nbr_participant', 20);
        // ->setFirstResult($offset)
        // ->setMaxResults($items_per_page)
        // ->addOrderBy($sort, $order);

        // dd($q->getQuery()->getSQL());
        // dd($q->getQuery()->getParameters());
        // exit;

      
        $resultat["total"]=$q_count->getQuery()->getSingleScalarResult();
        $resultat["data"] = $q->getQuery()->getResult();

        return $resultat;
    }
}
