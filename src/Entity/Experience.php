<?php

namespace App\Entity;

use App\Repository\ExperienceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiResource as ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 *@ApiResource(
 *     normalizationContext={"groups"={"read"}},
 *     paginationItemsPerPage=8
 * )
 *@ApiFilter(SearchFilter::class, properties={"id": "exact","guide":"exact"})
 *@ORM\Entity(repositoryClass=ExperienceRepository::class)
 */
class Experience
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read"})
     */
    private $title;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Assert\Range(
     *      min = 0,
     *      max = 5,
     *      notInRangeMessage = "Difficulte entre 0 et 5",
     * )
     *  @Groups({"read"})
     */
    private $dificulte;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nbr_participant;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nbr_participant_restant;

    /**
     * @Groups({"read"})
     * @ORM\Column(type="decimal", precision=10, scale=0)
     */
    private $prix;

    /**
     * @Groups({"read"})
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="boolean")
     */
    private $etat;

    /**
     * @ORM\Column(type="boolean")
     */
    private $fixe;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read"})
     */
    private $start;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read"})
     */
    private $finish;

    /**
     * @ORM\ManyToOne(targetEntity=Guide::class, inversedBy="experiences")
     */
    private $guide;


    /**
     * @Groups({"read"})
     */
    private $guide_eager;
    /**
     * @Groups({"read"})
     * @ORM\ManyToMany(targetEntity=ValeurReferentiel::class, fetch="EAGER")
     */
    private $activites;

    /**
     * @Groups({"read"})
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="experience", cascade={"persist"})
     */
    private $medias;

    /**
     * @Groups({"read"})
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity=Destination::class, inversedBy="experiences")
     * @ORM\JoinColumn(nullable=false)
     */
    private $destination;

    /**
     * @Groups({"read"})
     * @ORM\OneToMany(targetEntity=StepExperience::class, mappedBy="experience",cascade={"persist", "remove"})
     */
    private $steps;

    /**
     * @var array
     * @Groups({"read"})
     * @ORM\Column(name="requirement", type="json_array", nullable=true)
     */
    private $requirement = [];



    /**
     * @var array
     * @Groups({"read"})
     * @ORM\Column(name="notice", type="json_array", nullable=true)
     */
    private $notice = [];


    /**
     * @Groups({"read"})
     * @ORM\Column(name="duree",type="integer", nullable=true)
     */
    private $duree;

    /**
     * @ORM\ManyToMany(targetEntity=Subscription::class, mappedBy="experiences")
     */
    private $subscriptions;


    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(?int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }


    /**
     * @return array
     */
    public function getNotice(): array
    {
        return $this->notice;
    }



    /**
     * @param array $notice
     */
    public function setNotice(array $notice): void
    {
        $this->notice = $notice;
    }

    /**
     * @return array
     */
    public function getRequirement(): array
    {
        return $this->requirement;
    }

    /**
     * @param array $requirement
     */
    public function setRequirement(array $requirement): void
    {
        $this->requirement = $requirement;
    }




    public function __construct()
    {
        $this->activites = new ArrayCollection();
        $this->medias = new ArrayCollection();
        $this->steps = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
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
            $media->setExperience($this);
        }

        return $this;
    }

    public function removeMedia(Media $media): self
    {
        if ($this->medias->removeElement($media)) {
            // set the owning side to null (unless already changed)
            if ($media->getExperience() === $this) {
                $media->setExperience(null);
            }
        }

        return $this;
    }

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

    public function getDificulte(): ?int
    {
        return $this->dificulte;
    }

    public function setDificulte(?int $dificulte): self
    {
        $this->dificulte = $dificulte;

        return $this;
    }

    public function getNbrParticipant(): ?int
    {
        return $this->nbr_participant;
    }

    public function setNbrParticipant(?int $nbr_participant): self
    {
        $this->nbr_participant = $nbr_participant;

        return $this;
    }

    public function getNbrParticipantRestant(): ?int
    {
        return $this->nbr_participant_restant;
    }

    public function setNbrParticipantRestant(?int $nbr_participant_restant): self
    {
        $this->nbr_participant_restant = $nbr_participant_restant;

        return $this;
    }

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(string $prix): self
    {
        $this->prix = $prix;

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

    public function getEtat(): ?bool
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getFixe(): ?bool
    {
        return $this->fixe;
    }

    public function setFixe(bool $fixe): self
    {
        $this->fixe = $fixe;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
//        $timestamp = strtotime($this->start);
//        $date= date('d/m/Y', $timestamp);
        return $this->start;
    }

    public function setStart(?\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getFinish(): ?\DateTimeInterface
    {
        return $this->finish;
    }

    public function setFinish(?\DateTimeInterface $finish): self
    {
        $this->finish = $finish;

        return $this;
    }

    /**
     * @return array
     */
    public function getGuideEager()
    {
        $g=[];
        $g["id"]=$this->guide->getId();
        $g["fullName"]=$this->guide->getFullName();
        $g["imageName"]=$this->guide->getImageName();
        return $g;
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

    public function __toString()
    {
        return $this->title;
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

    /**
     * @return Collection|StepExperience[]
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(StepExperience $step): self
    {
        if (!$this->steps->contains($step)) {
            $this->steps[] = $step;
            $step->setExperience($this);
        }

        return $this;
    }

    public function removeStep(StepExperience $step): self
    {
        if ($this->steps->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getExperience() === $this) {
                $step->setExperience(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Subscription[]
     */
    public function getSubscriptions(): Collection
    {
        return $this->subscriptions;
    }

    public function addSubscription(Subscription $subscription): self
    {
        if (!$this->subscriptions->contains($subscription)) {
            $this->subscriptions[] = $subscription;
            $subscription->addExperience($this);
        }

        return $this;
    }

    public function removeSubscription(Subscription $subscription): self
    {
        if ($this->subscriptions->removeElement($subscription)) {
            $subscription->removeExperience($this);
        }

        return $this;
    }




}
