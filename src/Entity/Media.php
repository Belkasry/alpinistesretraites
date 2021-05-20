<?php

    namespace App\Entity;

    use App\Entity\Guide;
    use App\Repository\MediaRepository;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\HttpFoundation\File\File;
    use Vich\UploaderBundle\Entity\File as EmbeddedFile;
    use Vich\UploaderBundle\Mapping\Annotation as Vich;

    /**
     * @ORM\Entity(repositoryClass=MediaRepository::class)
     * @ORM\HasLifecycleCallbacks()
     * @Vich\Uploadable
     */
    class Media
    {
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         */
        private $id;

        /**
         * @ORM\ManyToOne(targetEntity=Guide::class, inversedBy="medias")
         * @ORM\JoinColumn(nullable=false)
         */
        private $guide;

        /**
         * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="medias")
         * @ORM\JoinColumn(nullable=true)
         */
        private $experience;

        /**
         * NOTE: This is not a mapped field of entity metadata, just a simple property.
         *
         * @Vich\UploadableField(mapping="photo_medias", fileNameProperty="imageName", size="imageSize")
         *
         * @var File|null
         */
        private $imageFile;

        /**
         * @ORM\Column(type="string")
         *
         * @var string|null
         */
        private $imageName;

        /**
         * @ORM\Column(type="integer")
         *
         * @var int|null
         */
        private $imageSize;

        /**
         * @ORM\Column(type="datetime")
         *
         * @var \DateTimeInterface|null
         */
        private $updatedAt;

        /**
         * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
         * of 'UploadedFile' is injected into this setter to trigger the update. If this
         * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
         * must be able to accept an instance of 'File' as the bundle will inject one here
         * during Doctrine hydration.
         *
         * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
         */
        public function setImageFile(?File $imageFile = null): void
        {
            $this->imageFile = $imageFile;

            if (null !== $imageFile) {
                // It is required that at least one field changes if you are using doctrine
                // otherwise the event listeners won't be called and the file is lost
                $this->updatedAt = new \DateTimeImmutable();
            }
        }

        public function getImageFile(): ?File
        {
            return $this->imageFile;
        }

        public function setImageName(?string $imageName): void
        {
            $this->imageName = $imageName;
        }

        public function getImageName(): ?string
        {
            return $this->imageName;
        }

        public function setImageSize(?int $imageSize): void
        {
            $this->imageSize = $imageSize;
        }

        public function getImageSize(): ?int
        {
            return $this->imageSize;
        }


        public function getId(): ?int
        {
            return $this->id;
        }

        public function getGuide(): ?Guide
        {
            return $this->guide;
        }

        public function setGuide(?Guide $guide): self
        {
            $this->guide = $guide;

            return $this;
        }

        /** @ORM\PrePersist */
        public function doStuffOnPostPersist()
        {
            $guide = $this->experience->getGuide();
            $this->setGuide($guide);

        }


        public function getExperience(): ?Experience
        {
            return $this->experience;
        }

        public function setExperience(?Experience $experience): self
        {
            $this->experience = $experience;

            return $this;
        }

        public function serialize()
        {
            $this->imageFile=base64_encode($this->imageFile);
        }


        public function unserialize($serialized)
        {
            $this->imageFile=base64_decode($this->imageFile);
        }
    }
