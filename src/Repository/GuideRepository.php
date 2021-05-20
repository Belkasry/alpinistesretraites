<?php

    namespace App\Repository;

    use App\Data\Search;
    use App\Entity\Guide;
    use App\Entity\ValeurReferentiel;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;

    /**
     * @method Guide|null find($id, $lockMode = null, $lockVersion = null)
     * @method Guide|null findOneBy(array $criteria, array $orderBy = null)
     * @method Guide[]    findAll()
     * @method Guide[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class GuideRepository extends ServiceEntityRepository
    {
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Guide::class);
        }

        /**
         * @return Guide[] Returns an array of Guide objects
         */

        public function searchGuide(Search $search, $count = false)
        {

            $qb = $this->createQueryBuilder('g');

            if ($search->name != "") {
                $qb = $qb
                    ->Where('g.nom like :val')
                    ->orWhere('g.prenom like :val')
                    ->setParameter('val', "%{$search->name}%");
            }
            if (!$count) {
                $qb = $qb
                    ->setMaxResults($search->limit)
                    ->setFirstResult($search->offset);
            }
            $qb = $qb
                ->getQuery()
                ->getResult();
            return $qb;
        }


        /*
        public function findOneBySomeField($value): ?Guide
        {
            return $this->createQueryBuilder('g')
                ->andWhere('g.exampleField = :val')
                ->setParameter('val', $value)
                ->getQuery()
                ->getOneOrNullResult()
            ;
        }
        */

        /**
         * @param Guide $guide
         * @return array<string>
         */
        public function getLibelleActivites(Guide $guide)
        {
            $libelleActivite = $guide->getActivites()->map(
                function (ValeurReferentiel $vr) {
                    return $vr->getLibelle();
                });
            return $libelleActivite;
        }
    }
