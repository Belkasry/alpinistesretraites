<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Experience;
use App\Entity\Subscription;
use App\Repository\ExperienceRepository;
use App\Repository\SubscriptionRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;

class DefaultController extends AbstractController
{
    /**
     * @Route("/accompagnateur")
     * @Route("/accompagnateur/{type}")
     * @Route("/accompagnateur/profil/{id}")
     * @Route("/experience/profil/{id}")
     * @Route("/experience")
     * @Route("/experience/{type}")
     * @Route("/auth")
     * @Route("/agent")
     * @Route("/agent/experiences")
     * @Route("/agent/experiences/{id}/edit")
     */
    public function index(): Response
    {

        // header('Content-Type: text/plain');
        // echo "Current PHP version: ", phpversion(), "\n";
        // echo "*** OPENSSL_CONF\n";
        // var_dump(getenv('OPENSSL_CONF'));
        // echo "\n*** Errors before calling openssl_pkey_new\n";
        // while (($e = openssl_error_string()) !== false) {
        //     var_dump($e);
        // }
        // echo "\n*** Calling openssl_pkey_new\n";
        // var_dump(openssl_pkey_new());
        // echo "\n*** Errors after calling openssl_pkey_new\n";
        // while (($e = openssl_error_string()) !== false) {
        //     var_dump($e);
        //     exit;
        // }
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route(
     *     name="subscription_patch",
     *     path="/api/follow/{id}",
     *     methods={"PATCH"},
     *     defaults={
     *         "_api_resource_class"=Subscription::class,
     *         "_api_item_operation_name"="patch_follow"
     *     }
     * )
     */
    public function followOrUnfollow(
        Subscription $subscription,
        Request $request,
        SubscriptionRepository $subRepo,
        IriConverterInterface $iriConverter,
        EntityManagerInterface $entityManager
    ) {
        $exp = null; $message = "";
        $json_recu = json_decode($request->getContent());
        if (property_exists($json_recu, "experiences")) {
            $exp = $json_recu->experiences[0];

            $experience = $iriConverter->getItemFromIri($exp);
           
            if ($subscription->containExperience($experience)) {
                $subRepo->removeOneExperience($subscription->getId(), $experience->getId());
                $message .= $subscription->getLogin() . " has unfollowed " . $experience->getTitle();
            } else {
                $subscription->addExperience($experience);
                $entityManager->persist($subscription);
                $entityManager->flush();
                $message .= $subscription->getLogin() . " has followed " . $experience->getTitle();
            }
        }

        if (property_exists($json_recu, "guides")) {
            $gud = $json_recu->guides[0];

            $guide = $iriConverter->getItemFromIri($gud);
            $message = "";
            if ($subscription->containGuide($guide)) {
                $subRepo->removeOneGuide($subscription->getId(), $guide->getId());
                $message = $subscription->getLogin() . " has unfollowed " . $guide->getFullName();
            } else {
                $subscription->addGuide($guide);
                $entityManager->persist($subscription);
                $entityManager->flush();
                $message = $subscription->getLogin() . " has followed " . $guide->getFullName();
            }
        }


        return new JsonResponse(
            [
                'message' => $message,
            ],
            RESPONSE::HTTP_OK
        );

        // if (isset($experience)) {
        //     if (()->contains($experience)) {
        //         return new JsonResponse(["id"=>$subscription->getExperience()[0]->getId()]);
        //         $subRepo->removeOneExperience($subscription->getId(), $experience->getId());
        //     } else {
        //         $subscription->addExperience($experience);
        //         return new JsonResponse(array('message' => $experience->getTitle()));
        //         $manager->flush();
        //     }
        // }

        // $guide = $iriConverter->getItemFromIri($gud);
        // if (isset($guide)) {
        //     return new JsonResponse(array('message' => $experience->getTitle()));
        // }





        return new JsonResponse((array) $subscription);
    }
}
