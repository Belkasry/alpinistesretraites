<?php

    namespace App\Entity;

    use App\Repository\DestinationRepository;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Component\Validator\Constraints as Assert;
    use ApiPlatform\Core\Annotation\ApiResource as ApiResource;
    use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
    use Symfony\Component\Serializer\Annotation\Groups;
    use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

    /**
     * @ApiResource(
     *     normalizationContext={"groups"={"read"}},
     * )
     * @ORM\Entity(repositoryClass=DestinationRepository::class)
     * @ORM\HasLifecycleCallbacks()
     */
    class Destination
    {
        /**
         * @ORM\Id
         * @ORM\GeneratedValue
          * @Groups({"list":"read"})
         * @ORM\Column(type="integer")
         */
        private $id;

        /**
         * @ORM\Column(type="string", length=255)
         * @Groups({"list":"read"})
         */
        private $name;

        /**
         * @ORM\Column(type="decimal", precision=30, scale=15, nullable=true)
         */
        private $longitude;

        /**
         * @ORM\Column(type="decimal", precision=30, scale=15, nullable=true)
         */
        private $latitude;

        /**
         * @ORM\ManyToOne(targetEntity=Destination::class, fetch="EAGER")
         */
        private $parent;

        /**
         * @ORM\Column(type="integer")
         */
        private $level;

        /**
         * @ORM\Column(type="text")
         */
        private $description;

        /**
         * @ORM\OneToMany(targetEntity=Experience::class, mappedBy="destination")
         */
        private $experiences;



        public function __construct()
        {
            $this->experiences = new ArrayCollection();
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


        public function getId(): ?int
        {
            return $this->id;
        }

        public function getName(): ?string
        {
            return $this->name;
        }

        public function setName(string $name): self
        {
            $this->name = $name;

            return $this;
        }

        public function getLongitude(): ?string
        {
            return $this->longitude;
        }

        public function setLongitude(?string $longitude): self
        {
            $this->longitude = $longitude;

            return $this;
        }

        public function getLatitude(): ?string
        {
            return $this->latitude;
        }

        public function setLatitude(?string $latitude): self
        {
            $this->latitude = $latitude;

            return $this;
        }

        public function getParent(): ?self
        {
            return $this->parent;
        }

        public function setParent(?self $parent): self
        {
            $this->parent = $parent;

            return $this;
        }

        public function getLevel(): ?int
        {
            return $this->level;
        }

        public function setLevel(int $level): self
        {
            $this->level = $level;

            return $this;
        }

        public function __toString()
        {
            return $this->name;
        }

        /**
         * @ORM\PrePersist
         */
        public function deduceLevel()
        {
            if ($this->parent != null)
                $this->level = $this->parent->getLevel() + 1;
            else
                $this->level=0;
        }

        public function hasParent(){
            return $this->parent && null !== $this->parent && $this->parent instanceof Destination;
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
                $experience->setDestination($this);
            }

            return $this;
        }

        public function removeExperience(Experience $experience): self
        {
            if ($this->experiences->removeElement($experience)) {
                // set the owning side to null (unless already changed)
                if ($experience->getDestination() === $this) {
                    $experience->setDestination(null);
                }
            }

            return $this;
        }



    }
