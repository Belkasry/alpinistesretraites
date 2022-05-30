<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\StepExperienceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     normalizationContext={
 *      "groups"={"read"},
 *     "datetime_format" = "H:i"
 * }
 * )
 * @ORM\Entity(repositoryClass=StepExperienceRepository::class)
 */
class StepExperience
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"list":"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list":"read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list":"read"})
     */
    private $resume;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"list":"read"})
     */
    private $duree;

    /**
     * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="steps")
     * @ORM\JoinColumn(nullable=false)
     */
    private $experience;

    /**
     * @ORM\ManyToOne(targetEntity=ValeurReferentiel::class)
     * @Groups({"list":"read"})
     */
    private $type_etape;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"list":"read"})
     */
    private $jour;

    /**
     * @ORM\Column(type="time", nullable=true)
     * @Groups({"list":"read"})
     */
    private $debut;

    /**
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity=Destination::class, inversedBy="experiences")
     * @Groups({"read"})
     */
    private $destination;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): self
    {
        $this->resume = $resume;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(int $duree): self
    {
        $this->duree = $duree;

        return $this;
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

    public function getTypeEtape(): ?ValeurReferentiel
    {
        return $this->type_etape;
    }

    public function setTypeEtape(?ValeurReferentiel $type_etape): self
    {
        $this->type_etape = $type_etape;

        return $this;
    }

    public function getJour(): ?int
    {
        return $this->jour;
    }

    public function setJour(int $jour): self
    {
        $this->jour = $jour;

        return $this;
    }

    public function getDebut(): ?\DateTimeInterface
    {
        return $this->debut;
    }

    public function setDebut(?\DateTimeInterface $debut): self
    {
        $this->debut = $debut;

        return $this;
    }


    public function getDestination(): ?Destination
    {
        return $this->destination;
    }

    public function setDestination(?Destination $destination): self
    {
        $this->destination = $destination;

        return $this;
    }
}
