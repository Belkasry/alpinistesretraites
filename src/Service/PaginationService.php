<?php

    namespace App\Service;


    use App\Data\Search;
    use App\Entity\Destination;
    use App\Entity\Guide;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\Persistence\ObjectManager;

    class PaginationService
    {
        private $entityClass;
        private $limit = 8;
        private $currentPage = 1;
        private $manager;
        private $search;

        /**
         * @return Search
         */
        public function getSearch()
        {
            return $this->search;
        }

        /**
         * @param Search $search
         */
        public function setSearch($search): void
        {
            $this->search = $search;


        }


        public function __construct(EntityManagerInterface $manager)
        {
            $this->manager = $manager;
        }

        public function getPages()
        {
            $total = $this->getCount();
            $pages = ceil($total / $this->limit);
            return $pages;
        }

        public function getCount()
        {
            $repo = $this->manager->getRepository($this->entityClass);

            if ($this->entityClass == Guide::class) {
                $total = count($repo->searchGuide($this->search, true));
            } elseif ($this->entityClass == Destination::class) {
                $total = count($repo->searchDestination($this->search, true));
            }
            return $total;
        }



        public function getData($index=false)
        {
            $offset = $this->currentPage * $this->limit - $this->limit;

            $this->search->limit = $this->limit;
            $this->search->offset = $offset;

            $repo = $this->manager->getRepository($this->entityClass);

            if ($this->entityClass == Guide::class) {
                $data = $repo->searchGuide($this->search);
            } elseif ($this->entityClass == Destination::class) {
                $data = $repo->searchDestination($this->search);
            }

            return $data;
        }

        public function setPage($page)
        {
            $this->currentPage = $page;
            return $this;
        }

        public function getPage()
        {
            return $this->currentPage;
        }

        /**
         * @return int
         */
        public function getLimit(): int
        {
            return $this->limit;
        }

        /**
         * @param int $limit
         */
        public function setLimit(int $limit): void
        {
            $this->limit = $limit;
        }

        /**
         * @return mixed
         */
        public function getEntityClass()
        {
            return $this->entityClass;
        }

        /**
         * @param mixed $entityClass
         */
        public function setEntityClass($entityClass): void
        {
            $this->entityClass = $entityClass;
        }

        /**
         * @return int
         */
        public function getCurrentPage(): int
        {
            return $this->currentPage;
        }

        /**
         * @param int $currentPage
         */
        public function setCurrentPage(int $currentPage): void
        {
            $this->currentPage = $currentPage;
        }


    }