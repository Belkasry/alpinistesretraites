<?php

    namespace App\Controller;

    use App\Data\Search;
    use App\Entity\Destination;
    use App\Form\FilterDestinationType;
    use App\Form\FilterSearchType;
    use App\Repository\DestinationRepository;
    use App\Service\PaginationService;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Session\SessionInterface;
    use Symfony\Component\Routing\Annotation\Route;

    class DestinationController extends AbstractController
    {
        /**
         * @Route("/destinations/{page<\d+>?1}", name="destinations")
         */
        public function index(DestinationRepository $repo, $page, PaginationService $paginationService,
                              Request $request, SessionInterface $session): Response
        {

            $search = new Search();
            $frmSearch = $this->createForm(FilterDestinationType::class, $search);
            $frmSearch->handleRequest($request);
            $session->set("search_form", $search);

            $paginationService
                ->setPage($page)
                ->setEntityClass(Destination::class);
            $paginationService->setSearch($search);


            return $this->render('destination/index.html.twig', [
                'frmSearch' => $frmSearch->createView(),
                'destinations' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_destination' => "active",
                'nbrpage' => $page,
                'count' => $paginationService->getCount(),
                "arbre" => []
            ]);
        }

        /**
         * @Route("/destination/{id_parent<\d+>?1}", name="destination")
         */
        public function index_destination(DestinationRepository $repo, $id_parent, PaginationService $paginationService,
                                          Request $request, SessionInterface $session): Response
        {


            $search = new Search();
            $search->parent = $id_parent;
            $frmSearch = $this->createForm(FilterDestinationType::class, $search);
            $frmSearch->handleRequest($request);
            $session->set("search_form", $search);
            $paginationService
                ->setPage(1)
                ->setEntityClass(Destination::class);
            $paginationService->setSearch($search);


            return $this->render('destination/index.html.twig', [
                'frmSearch' => $frmSearch->createView(),
                'destinations' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_destination' => "active",
                'nbrpage' => 1,
                'count' => $paginationService->getCount(),
                "arbre" => $repo->getDestinationsParentes($repo->find($id_parent))
            ]);
        }


        /**
         * @Route("/destination_ajax/{page<\d+>?1}", name="destination_ajax")
         */
        public function destination_ajax(DestinationRepository $repo, $page, PaginationService $paginationService,
                                         Request $request, SessionInterface $session): Response
        {

            $search = $session->get("search_form", new Search());
            $frmSearch = $this->createForm(FilterDestinationType::class, $search);
            $frmSearch->handleRequest($request);

            $paginationService
                ->setPage($page)
                ->setEntityClass(Destination::class);
            $paginationService->setSearch($search);

            return $this->render('destination/list-destination.html.twig', [
                'destinations' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_guide' => "active",
                'nbrpage' => $page,
                'count' => $paginationService->getCount(),
                "arbre"=>[]
            ]);
        }
    }
