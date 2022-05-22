<?php

namespace App\Controller\Api;

use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\Exception\ItemNotFoundException;
use App\Entity\Media;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class CreateMediaObjectAction
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter): Media
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new Media();
        $mediaObject->setImageFile($uploadedFile);

        $guide_iri = $request->request->get("guide");
        $experience_iri = $request->request->get("experience");

        if (!$experience_iri && !$guide_iri) {
            throw new BadRequestHttpException('neither guide nor experience were sent , guide is required');
        }

        if ($guide_iri) {
            try {
                $guide = $iriConverter->getItemFromIri($guide_iri);
                $guide_iri = $request->request->get("guide");
                $mediaObject->setGuide($guide);
            } catch (InvalidArgumentException $e) {
                throw new InvalidArgumentException('URI guide erroné', 400);
            }
        }
        if ($experience_iri) {
            try {
                $experience = $iriConverter->getItemFromIri($experience_iri);
                $experience_iri = $request->request->get("experience");
                $mediaObject->setExperience($experience);
            } catch (InvalidArgumentException $e) {
                throw new InvalidArgumentException('URI experience erroné', 400);
            }
        }


        return $mediaObject;
    }
}
