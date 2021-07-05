<?php

namespace App\Entity;

use App\Repository\StepExperienceRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource as ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read"}},
 * )
 * @ORM\Entity(repositoryClass=StepExperienceRepository::class)
 */
class StepExperience
{
    /**
     * @Groups({"list":"read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"list":"read"})
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @Groups({"list":"read"})
     * @ORM\Column(type="string", length=4000,)
     */
    private $resume;

    /**
     * @Groups({"list":"read"})
     * @ORM\Column(type="integer")
     */
    private $duree;


    /**
     * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="steps")
     * @ORM\JoinColumn(nullable=false)
     */
    private $experience;

    /**
     * @Groups({"list":"read"})
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lieu;

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

    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(?string $lieu): self
    {
        $this->lieu = $lieu;

        return $this;
    }
}
