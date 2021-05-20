<?php

namespace App\Repository;

use App\Entity\ValeurReferentiel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ValeurReferentiel|null find($id, $lockMode = null, $lockVersion = null)
 * @method ValeurReferentiel|null findOneBy(array $criteria, array $orderBy = null)
 * @method ValeurReferentiel[]    findAll()
 * @method ValeurReferentiel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ValeurReferentielRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ValeurReferentiel::class);
    }

    // /**
    //  * @return ValeurReferentiel[] Returns an array of ValeurReferentiel objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ValeurReferentiel
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
