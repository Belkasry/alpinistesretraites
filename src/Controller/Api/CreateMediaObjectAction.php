<?php

namespace App\Controller\Api;

use ApiPlatform\Core\Api\IriConverterInterface;
use ApiPlatform\Core\Exception\ItemNotFoundException;
use App\Entity\Media;
use App\Service\Base64FileExtractor;
use App\Service\UploadedBase64File;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class CreateMediaObjectAction
{
    public function __invoke(Request $request, IriConverterInterface $iriConverter, Base64FileExtractor $base64FileExtractor): Media
    {
        $uploadedFile = $request->files->get('file');
        $base64Image = $request->request->get('base64Image');

        $mediaObject = new Media();

        if ($uploadedFile) {
            $mediaObject->setImageFile($uploadedFile);
        } elseif ($base64Image) {
            $base64Image = $base64FileExtractor->extractBase64String($base64Image);
            $name = $request->request->get("name");
            $imageFile = new UploadedBase64File($base64Image, $name ? $name : "");
            $mediaObject->setImageFile($imageFile);
        } else {
            throw new BadRequestHttpException('"file" is required');
        }



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
