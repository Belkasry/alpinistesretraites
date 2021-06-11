<?php

    namespace App\Entity;

    use App\Repository\GuideRepository;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Component\HttpFoundation\File\UploadedFile;
    use Symfony\Component\HttpFoundation\File\File;
    use Vich\UploaderBundle\Entity\File as EmbeddedFile;
    use Vich\UploaderBundle\Mapping\Annotation as Vich;
    use ApiPlatform\Core\Annotation\ApiResource as ApiResource;
    use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
    use Symfony\Component\Serializer\Annotation\Groups;
    use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
    use App\ApiPlatform\GuideFilter;

    /**
     *@ApiResource(
     *     normalizationContext={"groups"={"read"}},
     *     paginationItemsPerPage=8
     * )
     *  @ApiFilter(GuideFilter::class)
     * @ORM\Entity(repositoryClass=GuideRepository::class)
     * @ORM\HasLifecycleCallbacks()
     * @Vich\Uploadable
     **/
    class Guide implements \Serializable
    {

        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @ORM\Column(type="integer")
         * @Groups({"read"})
         */
        private $id;

        /**
         * @ORM\Column(type="string", length=255)
         * @Groups({"read"})
         */
        private $nom;

        /**
         * @ORM\Column(type="string", length=255)
         * @Groups({"read"})
         */
        private $prenom;

        /**
         * @ORM\Column(type="integer")
         */
        private $age;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $phone;

        /**
         * @ORM\Column(type="text")
         * @Groups({"read"})
         */
        private $description;

        /**
         * @ORM\Column(type="string", length=255)
         * @Groups({"read"})
         */
        private $location;

        /**
         * @ORM\Column(type="string", length=255,nullable=true)
         */
        private $imageProfil;


        /**
         * NOTE: This is not a mapped field of entity metadata, just a simple property.
         *
         * @Vich\UploadableField(mapping="guide_image", fileNameProperty="imageName", size="imageSize")
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
         * @var \DateTimeInterface|null
         */
        private $updatedAt;


        /**
         * @var array
         *
         * @ORM\Column(name="links", type="json_array", nullable=true)
         */
        private $links = [
            'fb_link'=>'',
            'ig_link'=>'',
        ];

        /**
         * @ORM\ManyToMany(targetEntity=ValeurReferentiel::class, fetch="EAGER")
         */
        private $activites;

        /**
         * @ORM\OneToMany(targetEntity=Media::class, mappedBy="guide", cascade={"persist"})
         */
        private $medias;

        /**
         * @ORM\OneToMany(targetEntity=Experience::class, mappedBy="guide" , cascade={"persist"})
         */
        private $experiences;




        public function __construct()
        {
            $this->activites = new ArrayCollection();
            $this->medias = new ArrayCollection();
            $this->experiences = new ArrayCollection();
        }

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

        public function getNom(): ?string
        {
            return $this->nom;
        }

        public function setNom(string $nom): self
        {
            $this->nom = $nom;

            return $this;
        }

        public function getPrenom(): ?string
        {
            return $this->prenom;
        }

        public function setPrenom(string $prenom): self
        {
            $this->prenom = $prenom;

            return $this;
        }

        public function getAge(): ?string
        {
            return $this->age;
        }

        public function setAge(string $age): self
        {
            $this->age = $age;

            return $this;
        }

        public function getDescription(): ?string
        {
            return $this->description;
        }

        public function setDescription(string $description): self
        {
            $this->description = $description;

            return $this;
        }

        public function getLocation(): ?string
        {
            return $this->location;
        }

        public function setLocation(string $location): self
        {
            $this->location = $location;

            return $this;
        }

        public function getImageProfil(): ?string
        {
            return $this->imageProfil;
        }

        public function setImageProfil(string $imageProfil): self
        {
            $this->imageProfil = $imageProfil;

            return $this;
        }

        public function getPhone(): ?string
        {
            return $this->phone;
        }

        public function setPhone(string $phone): self
        {
            $this->phone = $phone;

            return $this;
        }

        /**
         * @return null|string
         * @Groups({"read"})
         */
        public function getFullName(): ?string
        {
            return $this->nom . " " . $this->prenom;
        }


        public function serialize()
        {
            $this->imageFile=base64_encode($this->imageFile);
        }


        public function unserialize($serialized)
        {
            $this->imageFile=base64_decode($this->imageFile);
        }

        /**
         * @return array
         */
        public function getLinks(): array
        {
            return $this->links;
        }

        /**
         * @param array $links
         */
        public function setLinks(array $links): void
        {
            $this->links = $links;
        }

        /**
         * @return Collection|ValeurReferentiel[]
         */
        public function getActivites(): Collection
        {
            return $this->activites;
        }

        public function addActivite(ValeurReferentiel $activite): self
        {
            if (!$this->activites->contains($activite)) {
                $this->activites[] = $activite;
            }

            return $this;
        }

        public function removeActivite(ValeurReferentiel $activite): self
        {
            $this->activites->removeElement($activite);

            return $this;
        }

        /**
         * @return Collection|Media[]
         */
        public function getMedias(): Collection
        {
            return $this->medias;
        }

        public function addMedia(Media $media): self
        {
            if (!$this->medias->contains($media)) {
                $this->medias[] = $media;
                $media->setGuide($this);
            }

            return $this;
        }

        public function removeMedia(Media $media): self
        {
            if ($this->medias->removeElement($media)) {
                // set the owning side to null (unless already changed)
                if ($media->getGuide() === $this) {
                    $media->setGuide(null);
                }
            }

            return $this;
        }

        public function getUpdatedAt(): ?\DateTimeInterface
        {
            return $this->updatedAt;
        }

        public function setUpdatedAt(\DateTimeInterface $updatedAt): self
        {
            $this->updatedAt = $updatedAt;

            return $this;
        }

        /**
         * @return Collection|Experience[]
         */
        public function getExperiences(): Collection
        {
            return $this->experiences;
        }

        public function addExperience(Experience $experience): self
        {
            if (!$this->experiences->contains($experience)) {
                $this->experiences[] = $experience;
                $experience->setGuide($this);
            }

            return $this;
        }

        public function removeExperience(Experience $experience): self
        {
            if ($this->experiences->removeElement($experience)) {
                // set the owning side to null (unless already changed)
                if ($experience->getGuide() === $this) {
                    $experience->setGuide(null);
                }
            }

            return $this;
        }

        public function __toString()
        {
            return $this->getFullName();
        }


    }
