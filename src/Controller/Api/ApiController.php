<?php

namespace App\Controller\Api;

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

class ApiController extends AbstractController
{
   

    /**
     * @Route(
     *     name="experiences_get",
     *     path="/rest/experiences",
     *     methods={"GET"}
     * )
     */
    public function exp_index(
        Request $request,
        ExperienceRepository $expRepo,
        EntityManagerInterface $entityManager
    ): JsonResponse {

        $experiences = $expRepo->findAll();
        return $this->json($experiences, 200, [],["groups"=>"read_grid"]);
    }
}
