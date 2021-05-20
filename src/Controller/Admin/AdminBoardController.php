<?php

namespace App\Controller\Admin;

use App\Entity\Destination;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\Asset\Packages;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class AdminBoardController extends AbstractDashboardController
{
    private $security;
    private $assetsManager;
    private $em;


    /**
     * AdminboardController constructor.
     */
    public function __construct(Security $security,Packages $assetsManager,EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->assetsManager=$assetsManager;
        $this->em=$em;
    }

    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {

        $routeBuilder = $this->get(AdminUrlGenerator::class);
        $url = $routeBuilder
            ->setController(UserCrudController::class)
            ->setAction('detail')
            ->setEntityId($this->security->getUser()->getId())
            ->generateUrl();

        return $this->redirect($url);}

    public function configureDashboard(): Dashboard
    {
        $imgurl=$this->assetsManager->getUrl('img/alpinistesretraites.png');
        return Dashboard::new()
            ->setTitle("<a href='/'><img src='".$imgurl."' width='100px'/></a>");
    }

    public function configureMenuItems(): iterable
    {
        return [
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),

            MenuItem::section('Gestion'),
            MenuItem::linkToCrud('Utilisateurs', 'fa fa-user', User::class),
            MenuItem::linkToCrud('Destinations', 'fa fa-thumb-tack', Destination::class),

        ];
    }
}
