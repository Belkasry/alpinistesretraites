<?php

namespace App\Controller\Api;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Experience;
use App\Entity\Subscription;
use App\Repository\ExperienceRepository;
use App\Repository\SubscriptionRepository;
use App\Service\UriReaderService;
use Doctrine\Common\Collections\Criteria;
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

    public const PAGE = 1;
    public const ITEMS_PER_PAGE = 4;
    public function __construct()
    {
    }

    /**
     * @Route(
     *     name="experiences_get",
     *     path="/rest/experiences",
     *     methods={"GET"}
     * )
     *rest/experiences?page=1&id=1,2&nbr_participant[eq]=3&nbr_participant[lte]=4&nbr_participant[gte]=2
     *&prix[eq]=4&prix[lte]=2&prix[gte]=6&etat[like]=false&start[lte]=21-06-2022&finish[gte]=30-06-2022&destination=4&duree[in]=4,5,6&duree[gte]=2&duree[lte]=5
     */
    public function exp_index(
        Request $request,
        UriReaderService $uriReaderService,
        ExperienceRepository $expRepo,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $params = $request->query->all();
        $validate_params = ['id', "nbr_participant", "nbr_participant", "prix", "etat", "start", "finish", "destination", "duree"];
        $validate_params[] = "order_by";
        $validate_params[] = "sort_by";
        $validate_params[] = "page";
        $parametres = $uriReaderService->parse($params, $validate_params, "exp");
        // $criterias = [];
        $page = key_exists("page", $parametres) ? $parametres["page"] : self::PAGE;
        $items_per_page = self::ITEMS_PER_PAGE;
        $offset = ($page - 1) * $items_per_page;
        // dd($parametres);
        $experiences = $expRepo->getExperiences($parametres, $items_per_page, $offset);
        return $this->json($experiences, 200, [], ["groups" => "read_grid"]);
    }
}
