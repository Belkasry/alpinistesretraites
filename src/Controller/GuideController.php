<?php

    namespace App\Controller;

    use App\Data\Search;
    use App\Entity\Guide;
    use App\Entity\User;
    use App\Entity\ValeurReferentiel;
    use App\Entity\Ville;
    use App\Form\FilterSearchType;
    use App\Form\GuideType;
    use App\Form\InscriptionType;
    use App\Repository\GuideRepository;
    use App\Service\PaginationService;
    use Doctrine\ORM\EntityManagerInterface;
    use Doctrine\Persistence\ObjectManager;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Session\SessionInterface;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

    class GuideController extends AbstractController
    {
        /**
         * @Route("/guides/{page<\d+>?1}", name="guides")
         */
        public function index(GuideRepository $repo, $page, PaginationService $paginationService,
                              Request $request,SessionInterface $session): Response
        {

            $search = new Search();
            $frmSearch = $this->createForm(FilterSearchType::class,$search);
            $frmSearch->handleRequest($request);
            $session->set("search_form",$search);
            $paginationService
                ->setPage($page)
                ->setEntityClass(Guide::class);
            $paginationService->setSearch($search);

//            dump($paginationService);exit;


            return $this->render('guide/index.html.twig', [
                'frmSearch' => $frmSearch->createView(),
                'guides' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_guide' => "active",
                'nbrpage' => $page,
                'count' => $paginationService->getCount()
            ]);
        }


        /**
         * @Route("/guides_ajax/{page<\d+>?1}", name="guide_ajax")
         */
        public function ajax(GuideRepository $repo, $page, PaginationService $paginationService,
                             Request $request,SessionInterface $session): Response
        {

            $search = $session->get("search_form",new Search());
            $frmSearch = $this->createForm(FilterSearchType::class,$search);
            $frmSearch->handleRequest($request);

            $paginationService
                ->setPage($page)
                ->setEntityClass(Guide::class);
            $paginationService->setSearch($search);

//            dump($paginationService);exit;


            return $this->render('guide/list-guide.html.twig', [
//                'frmSearch' => $frmSearch->createView(),
                'guides' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_guide' => "active",
                'nbrpage' => $page,
                'count' => $paginationService->getCount()
            ]);
        }


        /**
         * @Route("/guides_sajax/{page<\d+>?1}", name="search_guide_ajax")
         */
        public function searchajax(GuideRepository $repo, $page, PaginationService $paginationService): Response
        {

            $paginationService
                ->setPage($page)
                ->setEntityClass(Guide::class);


            return $this->render('guide/list-guide.html.twig', [
                'guides' => $paginationService->getData(),
                'pagination' => $paginationService,
                'current_guide' => "active",
                'nbrpage' => $page
            ]);
        }


        /**
         * @Route("/guide/nouveau", name="nouveau_guide")
         */
        public function formGuide(EntityManagerInterface $manager,UserPasswordEncoderInterface $encoder, Request $request): Response
        {

            $guide = new Guide();
            $user = new User();
            $user->setGuide($guide);


            $vrRepo = $manager->getRepository(ValeurReferentiel::class);
            $vrRepoVille = $manager->getRepository(Ville::class);
            $criteria = array('id_ref' => 1);
            $activites = $vrRepo->findBy($criteria);
            $villes = $vrRepoVille->findAll();
            $options = array();
            $options["activites"] = $activites;
            $options["villes"] = $villes;
            $frmLogin = $this->createForm(InscriptionType::class, $user,
                $options);
            $frmLogin->handleRequest($request);

//            $frmInfo = $this->createForm(GuideType::class, $guide);
//            $frmInfo->handleRequest($request);

            if ($frmLogin->isSubmitted() and $frmLogin->isValid()) {
                $agreement = $frmLogin['agreeTerms']->getData();

                if ($agreement) {
                    $user->setGuide($guide);
                    $t = bin2hex(random_bytes(16));;
                    $user->setToken($t);
                    $password = $frmLogin['password_hash']->getData();
                    $user->setPasswordHash($encoder->encodePassword($user,$password));
                    $manager->persist($user);
                    $manager->flush();
                    $this->redirect("/login");
                }
            }


            return $this->render('guide/new.html.twig', [
                'frmLogin' => $frmLogin->createView(),
//                'frmInfo' => $frmInfo->createView(),
                'current_guide' => "active",
            ]);
        }

        /**
         * @Route("/guide/{id}", name="profil_guide")
         */
        public function profilGuide($id): Response
        {

            $repo = $this->getDoctrine()->getRepository(Guide::class);
            $guide = $repo->find($id);
            $libelleActivite = $repo->getLibelleActivites($guide);

            return $this->render('guide/profil.html.twig', [
                'guide' => $guide,
                'current_guide' => "active",
                'activites' => $libelleActivite
            ]);
        }


    }
