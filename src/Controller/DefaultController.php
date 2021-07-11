<?php

    namespace App\Controller;

    use App\Entity\Subscription;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\Validator\Validator\ValidatorInterface;
    use App\Entity\User;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
    use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
    use Symfony\Component\Serializer\Serializer;

    class DefaultController extends AbstractController
    {
        /**
         * @Route("/accompagnateur")
         * @Route("/accompagnateur/{type}")
         * @Route("/accompagnateur/profil/{id}")
         * @Route("/accompagnateur/experience/{id}")
         */
        public function index(): Response
        {
            return $this->render('default/index.html.twig', [
                'controller_name' => 'DefaultController',
            ]);
        }

        /**
         * @Route("/register", name="user_registration")
         */
        public function register(Request $request, ValidatorInterface $validator, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $em)
        {
//            $serializer = new Serializer();

            $serializer = $this->get('serializer');

            $data = $request->getContent();
            $user = $serializer->deserialize($data, User::class, 'json', ['groups' => "write"]);
            $user->setPasswordHash($passwordEncoder->encodePassword($user, $user->plain_password));
            $t = bin2hex(random_bytes(16));;
            $user->setToken($t);
            $errors = $validator->validate($user);
            $erreurs = [];
            if (count($errors)) {
                foreach ($errors as $error) {
                    $erreurs[] = $error->getMessage();
                }

                return new JsonResponse($erreurs, Response::HTTP_UNAUTHORIZED);
            }


            $em->persist($user);
            $em->flush();

            return new Response(json_encode($user), Response::HTTP_CREATED);
        }

        /**
         * @Route("/activate_user/{token}", name="activate_user")
         */
        public function activateUser(Request $request, $token, EntityManagerInterface $manager): Response
        {
            $serializer = $this->get('serializer');
            $data = json_decode($request->getContent(), true);
            $email = "";
            if (array_key_exists("email", $data))
                $email = $data["email"];
            else return new JsonResponse(["Email Invalid"], Response::HTTP_UNAUTHORIZED);
            $repo = $manager->getRepository(User::class);
            $user = $repo->findOneByEmailToken($email,$token);
            if ($user && $user->getStatut() != 1) {
                $subscription=new Subscription();
                $manager->persist($subscription);
                $user->setSubscription($subscription);
                $user->setStatut(1);
                $user->addRole("ROLE_UTILISATEUR");
                $manager->persist($user);
                $manager->flush();
            } elseif ($user && $user->getStatut() == 1) {
                return new JsonResponse(["User Already confirmed"], Response::HTTP_UNAUTHORIZED);
            } else {
                return new JsonResponse(["Wrong confirmation Code"], Response::HTTP_UNAUTHORIZED);
            }
            return new JsonResponse(["USER Activated"], Response::HTTP_CREATED);
        }


    }
