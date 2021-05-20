<?php

    namespace App\Service;


    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\Persistence\ObjectManager;

    class LoadMoreService
    {
        private $entityClass;
        private $limit = 8;
        private $currentPage = 1;
        private $manager;

        public function __construct(EntityManagerInterface $manager)
        {
            $this->manager = $manager;
        }

        public function getPages()
        {
            $repo=$this->manager->getRepository($this->entityClass);
            $total=count($repo->findAll());

            $pages=ceil($total/$this->limit);
            return $pages;

        }


        public function getData()
        {
            $offset = $this->currentPage * $this->limit - $this->limit;

            $repo = $this->manager->getRepository($this->entityClass);
            $data = $repo->findby([], [], $this->limit, $offset);

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