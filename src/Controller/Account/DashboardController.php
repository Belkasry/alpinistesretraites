<?php

    namespace App\Controller\Account;

    use App\Entity\Experience;
    use App\Entity\Guide;
    use App\Entity\Media;
    use App\Entity\User;
    use App\Entity\ValeurReferentiel;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
    use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
    use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
    use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
    use Symfony\Bundle\MakerBundle\Doctrine\EntityClassGenerator;
    use Symfony\Component\Asset\Packages;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Core\Security;
    use Symfony\Component\Security\Core\User\UserInterface;

    class DashboardController extends AbstractDashboardController
    {

        private $security;
        private $assetsManager;

        /**
         * DashboardController constructor.
         */
        public function __construct(Security $security, Packages $assetsManager)
        {
            $this->security = $security;
            $this->assetsManager = $assetsManager;
        }

        /**
         * @Route("/account")
         */
        public function index(): Response
        {
//        $adminUrlGenerator = $this->get(AdminUrlGenerator::class);
//        $url = $adminUrlGenerator->build()
//            ->setController(UserCrudController::class)
//            ->setAction('detail')
//            ->generateUrl();
//        return $url;

            $routeBuilder = $this->get(AdminUrlGenerator::class);
            $url = $routeBuilder
                ->setController(UserCrudController::class)
                ->setAction('detail')
                // ->setEntityId($this->security->getUser()->getId())
                ->generateUrl();

            return $this->redirect($url);
        }


        public function configureDashboard(): Dashboard
        {
            $imgurl = $this->assetsManager->getUrl('img/alpinistesretraites.png');
            return Dashboard::new()
                ->setTitle("<a href='/'><img src='" . $imgurl . "' width='100px'/></a>");

        }

        public function configureMenuItems(): iterable
        {


            $id_guide = $this->security->getUser()->getGuide()->getId();

            return [
                MenuItem::linktoDashboard('Profil', 'fa fa-user-circle'),
                MenuItem::linkToCrud('Info Personnelles', 'fa fa-info', Guide::class)
                    ->setAction('detail')
                    ->setController(GuideCrudController::class)
                    ->setEntityId($id_guide),
                MenuItem::linkToCrud('Media', 'fa fa-images', Guide::class)
                    ->setAction('detail')
                    ->setController(MediaCrudController::class)
                    ->setEntityId($id_guide),
                MenuItem::linkToCrud('Experiences', 'fa fa-passport', Experience::class)
                    ->setController(ExperienceCrudController::class)
//                ->setAction('detail')
//                    ->setEntityId($id_guide),
            ];

            // links to a different CRUD action


        }
    }
