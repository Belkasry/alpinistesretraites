<?php

    namespace App\Repository;

    use App\Data\Search;
    use App\Entity\Destination;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;

    /**
     * @method Destination|null find($id, $lockMode = null, $lockVersion = null)
     * @method Destination|null findOneBy(array $criteria, array $orderBy = null)
     * @method Destination[]    findAll()
     * @method Destination[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class DestinationRepository extends ServiceEntityRepository
    {
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Destination::class);
        }


        /**
         * @return Destination[] Returns an array of Destination objects
         */

        public function searchDestination(Search $search, $count = false)
        {

            $qb = $this->createQueryBuilder('d');

            if ($search->name != "") {
                $qb = $qb
                    ->andWhere('d.name like :val')
                    ->setParameter('val', "%{$search->name}%");
            }
            if ($search->parent == "adam") {
                $qb = $qb
                    ->andWhere('d.level=0')
                    ->andWhere('d.parent is NULL');
            } elseif ($search->parent == "orphelin") {

            } else {
                $qb = $qb
                    ->andWhere('d.parent = :val_p')
                    ->setParameter('val_p', $search->parent);
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

        /**
         * @return Destination[] Returns an array of Destination objects
         * @param Destination $parent
         */
        public function getDestinationChildren($parent)
        {
            return $this->createQueryBuilder('d')
                ->andWhere('d.parent_id = :val')
                ->setParameter('val', $parent->getId())
                ->orderBy('d.id', 'ASC')
                ->getQuery()
                ->getResult();
        }


        /**
         * @return Destination[] Returns an array of Destination objects
         */
        public function getDestinationsParentes(Destination $destination)
        {
            $destinations = [];
            do {
                $destinations[$destination->getid()] = $destination->getName();
                $destination = $destination->getParent();
            } while ($destination != null);
            ksort($destinations);
//            dump($destinations);exit;
            return $destinations;
        }


        /**
         * @return Destination Returns an array of Destination objects
         */
        public function getDestination($destination, $level)
        {
            $parent = $destination->getParent();
            while ($parent->getLevel() > $level) {
                $parent = $parent->getParent();
            }
            return $parent;
        }

        /**
         * @return Destination Returns Destination object
         * @param Destination $destination
         */
        public function getParent_0($destination)
        {

            if ($destination->hasParent()) {
                return self::getParent_0($destination->getParent());
            }
            return $destination;


        }


        /*
        public function findOneBySomeField($value): ?Destination
        {
            return $this->createQueryBuilder('d')
                ->andWhere('d.exampleField = :val')
                ->setParameter('val', $value)
                ->getQuery()
                ->getOneOrNullResult()
            ;
        }
        */
    }
