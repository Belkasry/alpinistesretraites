<?php

namespace App\Repository;

use App\Entity\StepExperience;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method StepExperience|null find($id, $lockMode = null, $lockVersion = null)
 * @method StepExperience|null findOneBy(array $criteria, array $orderBy = null)
 * @method StepExperience[]    findAll()
 * @method StepExperience[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StepExperienceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StepExperience::class);
    }

    // /**
    //  * @return StepExperience[] Returns an array of StepExperience objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?StepExperience
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
