<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SubscriptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\ApiPlatform\SubscriptionFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 *@ApiResource(
 *     attributes={
 *              "input_formats"={"json"={"application/ld+json", "application/json"}},
 *              "normalization_context"={"groups"={"read"}},
 *              "denormalization_context"={"groups"={"write"}},
 *              "itemOperations"={
 *                            "get","delete","put","patch",
 *                            "_api_item_operation_name"={
 *                                                        "method": "PATCH",
 *                                                        "route_name"="subscription_patch"
 *                                                        }
 *                            }}
 * )
 *     
 * @ApiFilter(SubscriptionFilter::class)
 * @ORM\Entity(repositoryClass=SubscriptionRepository::class)
 */

class Subscription
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read", "write"})
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     */
    private $id;

    /**
     * @Groups({"read", "write"})
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="subscription", cascade={"persist", "remove"})
     * @ApiProperty(readableLink=false)
     */
    private $user;

    /**
     * @Groups({"read", "write"})
     * @ORM\ManyToMany(targetEntity=Guide::class, inversedBy="subscriptions")
     * @ApiProperty(readableLink=false)
     */
    private $guide;

    /**
     * @Groups({"read", "write"})
     * @ORM\ManyToMany(targetEntity=Experience::class, inversedBy="subscriptions", cascade={"persist"})
     * @ApiProperty(readableLink=false)
     */
    private $experience;



    /**
     * @Groups({"read"})
     * @var string
     */
    private $login;

    /**
     * @return string
     */
    public function getLogin()
    {
        return $this->user->getLogin();
    }



    public function __construct()
    {
        $this->guide = new ArrayCollection();
        $this->experience = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }


    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Guide[]
     */
    public function getGuide(): Collection
    {
        return $this->guide;
    }

    public function addGuide(Guide $guide): self
    {
        if (!$this->guide->contains($guide)) {
            $this->guide[] = $guide;
        }

        return $this;
    }

    public function removeGuide(Guide $guide): self
    {
        $this->guide->removeElement($guide);

        return $this;
    }

    /**
     * @return Collection|Experience[]
     */
    public function getExperience(): Collection
    {
        return $this->experience;
    }


    public function addExperience(Experience $experience): self
    {

        if (!$this->experience->contains($experience)) {
            $this->experience[] = $experience;
        }

        return $this;
    }

    public function removeExperience(Experience $exp): self
    {
            $this->experience->removeElement($exp);
            return $this;
    }


    public function containExperience(Experience $exp){
        if (!$this->experience->contains($exp)) {
            return false;
        }
        return true;

    }

    public function containGuide(Guide $gud){
        if (!$this->guide->contains($gud)) {
            return false;
        }
        return true;
    }
}
