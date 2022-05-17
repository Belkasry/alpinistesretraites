<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
use Exception;
use Lcobucci\JWT\Validation\ConstraintViolation;
use Symfony\Component\BrowserKit\Request as BrowserKitRequest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
use Symfony\Component\Serializer\Exception\PartialDenormalizationException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolation as ValidatorConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ExperienceApiController extends AbstractController
{
    public const PAGE = 1;
    public const ITEMS_PER_PAGE = 5;
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
        $validate_params = ['id', "title", "nbr_participant", "prix", "etat", "start", "finish", "destination", "duree", "dificulte"];
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
        return $this->json($experiences, 200,  [], ["groups" => "read_grid"]);
    }

    /**
     * @Route(
     *     name="experience_get",
     *     path="/rest/experiences/{id}",
     *     methods={"GET"}
     * )
     *rest/experiences/1
     */
    public function exp_show(
        $id,
        Request $request,
        UriReaderService $uriReaderService,
        ExperienceRepository $expRepo,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $params = $request->query->all();
        $validate_params = ['id', "title", "nbr_participant", "prix", "etat", "start", "finish", "destination", "duree"];
        $validate_params[] = "page";
        // dd($parametres);
        $experience = $expRepo->find($id);
        return $this->json($experience, 200,  [], ["groups" => "read_item"]);
    }

    /**
     * @Route(
     *     name="experience_post",
     *     path="/rest/experiences",
     *     methods={"POST"}
     * )
     */
    public function exp_store(
        Request $request,
        UriReaderService $uriReaderService,
        ExperienceRepository $expRepo,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer
    ): JsonResponse {
        try {
            $experience = new Experience();
            try {
                $experience = $serializer->deserialize($request->getContent(), Experience::class, 'json', [
                    DenormalizerInterface::COLLECT_DENORMALIZATION_ERRORS => true,
                ]);

                $errors =  $validator->validate($experience, null, ["brouillon"]);
                if ($errors->count()) {
                    return $this->json($errors, Response::HTTP_BAD_REQUEST);
                }
            } catch (PartialDenormalizationException  $e) {
                $violations = new ConstraintViolationList();
                /** @var NotNormalizableValueException $exception */
                foreach ($e->getErrors() as $exception) {
                    $message = sprintf('The type must be one of "%s" ("%s" given).', implode(', ', $exception->getExpectedTypes()), $exception->getCurrentType());
                    $parameters = [];
                    if ($exception->canUseMessageForUser()) {
                        $parameters['hint'] = $exception->getMessage();
                    }
                    $violations->add(new ValidatorConstraintViolation($message, '', $parameters, null, $exception->getPath(), null));
                }

                return $this->json($violations, 400);
            } catch (NotNormalizableValueException $e) {
                return $this->json(["violations" => ["propertyPath" => $e->getPath(), "title" => $e->getMessage()]], 400);
            } catch (Exception $e) {

                return $this->json($e->getMessage(), Response::HTTP_BAD_REQUEST);
            }

            // 




            $entityManager->persist($experience);
            $entityManager->flush();
            return $this->json($experience, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }


    /**
     * @Route(
     *     name="experience_put",
     *     path="/rest/experiences/{id}",
     *     methods={"PUT"}
     * )
     */
    public function exp_edit(
        $id,
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
        ExperienceRepository $expRepo
    ): JsonResponse {


        try {
            $experience = $expRepo->find($id);

            try {
                $serializer->deserialize($request->getContent(), Experience::class, 'json', ['object_to_populate' => $experience]);

                $errors =  $validator->validate($experience, null, ["brouillon"]);
                if ($errors->count()) {
                    return $this->json($errors, Response::HTTP_BAD_REQUEST);
                }
            } catch (PartialDenormalizationException  $e) {
                $violations = new ConstraintViolationList();
                /** @var NotNormalizableValueException $exception */
                foreach ($e->getErrors() as $exception) {
                    $message = sprintf('The type must be one of "%s" ("%s" given).', implode(', ', $exception->getExpectedTypes()), $exception->getCurrentType());
                    $parameters = [];
                    if ($exception->canUseMessageForUser()) {
                        $parameters['hint'] = $exception->getMessage();
                    }
                    $violations->add(new ValidatorConstraintViolation($message, '', $parameters, null, $exception->getPath(), null));
                }

                return $this->json($violations, 400);
            } catch (NotNormalizableValueException $e) {
                return $this->json(["violations" => ["propertyPath" => $e->getPath(), "title" => $e->getMessage()]], 400);
            } catch (Exception $e) {

                return $this->json($e->getMessage(), Response::HTTP_BAD_REQUEST);
            }

            // 

            $entityManager->flush();
            return $this->json($experience, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }


    /**
     * @Route(
     *     name="experience_delete",
     *     path="/rest/experiences/{id}",
     *     methods={"DELETE"}
     * )
     */
    public function exp_delete(
        $id,
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
        ExperienceRepository $expRepo
    ): JsonResponse {

        try {

            $experience = $expRepo->find($id);
            if (!$experience)
                return $this->json(['status' => 400, 'message' => "No Experience with id : $id "], 400);
                
            $titre = $experience->getTitle();
            $entityManager->remove($experience);
            $entityManager->flush();
            return $this->json(['status' => 200, 'message' => "$id -- $titre is removed"], 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }
    }
}
