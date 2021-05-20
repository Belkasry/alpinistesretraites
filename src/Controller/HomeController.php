<?php

    namespace App\Controller;

    use App\Entity\Destination;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class HomeController extends AbstractController
    {
        /**
         * @Route("/",name="accueil")
         */
        public function home()
        {
//            $repo = $this->getDoctrine()->getRepository(Destination::class);
//            $destination = $repo->find(3);
//            dump($repo->getParent_0($destination));exit;
            return $this->render(
                'base.html.twig',["current_home"=>"active"]
            );
        }

    }