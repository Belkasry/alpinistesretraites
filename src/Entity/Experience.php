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
use ApiPlatform\Core\Annotation\ApiProperty;
use App\ApiPlatform\ExperienceFilter;
use JsonSerializable;

/**
 *@ApiResource(
 *     normalizationContext={"groups"={"read","read_grid","read_item"}},
 *     paginationItemsPerPage=8
 * )
 *  @ApiFilter(ExperienceFilter::class)
 *@ORM\Entity(repositoryClass=ExperienceRepository::class)
 */
class Experience implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"read","read_grid","read_item"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Assert\NotNull
     * @Groups({"read_grid","read"})
     */
    private $title;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Assert\Range(
     *      min = 0,
     *      max = 5,
     *      notInRangeMessage = "Difficulte entre 0 et 5",
     * )
     *  @Groups({"read_grid","read","read_item"})
     */
    private $dificulte;

    /**
     *  @Groups({"read","read_item","read_grid"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nbr_participant;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nbr_participant_restant;

    /**
     * @Groups({"read","read_item","read_grid"})
     * @ORM\Column(type="decimal", precision=10, scale=0)
     */
    private $prix = 0.00;

    /**
     * @Groups({"read","read_item"})
     * @ORM\Column(type="text")
     */
    private $description = "";

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read_grid","read_item"})
     */
    private $etat = false;

    /**
     * @ORM\Column(type="boolean",options={"default" : false})
     */
    private $fixe = false;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read","read_item","read_grid"})
     */
    private $start;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"read","read_item","read_grid"})
     */
    private $finish;

    /**
     * @ORM\ManyToOne(targetEntity=Guide::class, inversedBy="experiences")
     */
    private $guide;


    /**
     * @Groups({"read","read_item"})
     */
    private $guide_eager;
    /**
     * @Groups({"read","read_item"})
     * @ORM\ManyToMany(targetEntity=ValeurReferentiel::class, fetch="EAGER")
     */
    private $activites;

    /**
     * @Groups({"read"})
     * @ORM\OneToMany(targetEntity=Media::class, mappedBy="experience", cascade={"persist"})
     */
    private $medias;

    /**
     * @Groups({"read","read_item","read_grid"})
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity=Destination::class, inversedBy="experiences")
     */
    private $destination;

    /**
     * @Groups({"read"})
     * @ORM\OneToMany(targetEntity=StepExperience::class, mappedBy="experience",cascade={"persist", "remove"})
     * @ApiProperty(readableLink=false)
     */
    private $steps;


    /**
     * @var array
     * @Groups({"read","read_item"})
     */
    private $steps_list;

    /**
     * @var array
     * @Groups({"read","read_item"})
     * @ORM\Column(name="requirement", type="json_array", nullable=true)
     */
    private $requirement = [];



    /**
     * @var array
     * @Groups({"read","read_item"})
     * @ORM\Column(name="notice", type="json_array", nullable=true)
     */
    private $notice = [];

    /**
     * @Groups({"read","read_item"})
     * @ORM\Column(type="json", nullable=true)
     */
    private $include = [];


    /**
     * @Groups({"read","read_item","read_grid"})
     * @ORM\Column(name="duree",type="integer", nullable=true)
     */
    private $duree;

    /**
     * @ApiProperty(
     *      readableLink=false,
     *  )
     * @Groups({"read"})
     * @ORM\ManyToMany(targetEntity=Subscription::class, mappedBy="experience")
     */
    private $subscriptions;

    /**
     * @ApiProperty(
     *      readableLink=true,
     *  )
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="experience")
     * @Groups({"read",})
     */
    private $reviews;


    public function __construct()
    {
        $this->activites = new ArrayCollection();
        $this->medias = new ArrayCollection();
        $this->steps = new ArrayCollection();
        $this->subscriptions = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }


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
        $g = [];
        $g["id"] = $this->guide->getId();
        $g["fullName"] = $this->guide->getFullName();
        $g["imageName"] = $this->guide->getImageName();
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
     * @return Array
     */
    public function getStepsList(): array
    {
        $steps = $this->steps;
        $listStep = [];
        foreach ($steps as $step) {
            $listStep[$step->getJour()][] = [
                "id" => $step->getId(), "title" => $step->getTitle()
            ];
        }
        return $listStep;
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

    // /**
    //  * @return Collection|Subscription[]
    //  */
    // public function getSubscriptions(): Collection
    // {
    //     return $this->subscriptions;
    // }

    // public function addSubscription(Subscription $subscription): self
    // {
    //     if (!$this->subscriptions->contains($subscription)) {
    //         $this->subscriptions[] = $subscription;
    //         $subscription->addExperience($this);
    //     }

    //     return $this;
    // }

    // public function removeSubscription(Subscription $subscription): self
    // {
    //     if ($this->subscriptions->removeElement($subscription)) {
    //         $subscription->removeExperience($this);
    //     }

    //     return $this;
    // }

    // /**
    //  * @return Collection|Review[]
    //  */
    // public function getReviews(): Collection
    // {
    //     return $this->reviews;
    // }

    // public function addReview(Review $review): self
    // {
    //     if (!$this->reviews->contains($review)) {
    //         $this->reviews[] = $review;
    //         $review->setExperience($this);
    //     }

    //     return $this;
    // }

    // public function removeReview(Review $review): self
    // {
    //     if ($this->reviews->removeElement($review)) {
    //         // set the owning side to null (unless already changed)
    //         if ($review->getExperience() === $this) {
    //             $review->setExperience(null);
    //         }
    //     }

    //     return $this;
    // }

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

    /**
     * @return Collection|Review[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setExperience($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getExperience() === $this) {
                $review->setExperience(null);
            }
        }

        return $this;
    }

    public function getInclude(): ?array
    {
        return $this->include;
    }

    public function setInclude(?array $include): self
    {
        $this->include = $include;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
        ];
    }
}
