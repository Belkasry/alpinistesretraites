<?php

    namespace App\Controller;

    use App\Entity\User;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

    class UserController extends AbstractController
    {
        /**
         * @Route("/login", name="login_user")
         */
        public function login(AuthenticationUtils $authenticationUtils): Response
        {

            $error = $authenticationUtils->getLastAuthenticationError();
            $lastUsername = $authenticationUtils->getLastUsername();

            $errorMessage="";

            if($error !== null){
                $errorMessage=$error->getMessage();
            }

            return $this->render('user/auth.html.twig', [
                'hasError' => $error !== null,
                'error' => $errorMessage,
                'lastUsername' => $lastUsername,
            ]);
        }

        /**
         * @Route("/logout", name="logout_user")
         */
        public function logout(): Response
        {
        }

        /**
         * @Route("/activate/{token}", name="activate_token")
         */
        public function activateUserGuide($token, EntityManagerInterface $manager):Response
        {
            $repo = $manager->getRepository(User::class);
            $user = $repo->findOneBy(['token' => $token]);
            if ($user) {
                $user->setStatut(1);
                $user->addRole("ROLE_GUIDE");
                $manager->persist($user);
                $manager->flush();
            }

            return $this->redirect("/login");
//            return $this->render('base.html.twig', [
//            ]);

        }



    }
