<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\JoinColumn;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Repository\ReviewRepository;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"read"}},
 *    paginationItemsPerPage=2
 * )
 * @ORM\Entity(repositoryClass=ReviewRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "experience": "exact", "user": "exact","guide":"exact"})
 */
class Review
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Experience::class, inversedBy="reviews")
     */
    private $experience;

    /**
     * @ORM\Column(type="float")
      * @Groups({"read"})
     */
    private $mark;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read"})
     */
    private $comment;

    /**
     * @ApiProperty(
     *      readableLink=false,
     *  )
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read"})
     */
    private $user;


    /**
     * @var string
     * @Groups({"read"})
     */
    private $login;

    /**
     * @ORM\ManyToOne(targetEntity=Guide::class, inversedBy="reviews")
     */
    private $guide;


    /**
     * @return string
     */
    public function getLogin()
    {
        return $this->user->getLogin();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getMark(): ?float
    {
        return $this->mark;
    }

    public function setMark(float $mark): self
    {
        $this->mark = $mark;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
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

    public function getGuide(): ?Guide
    {
        return $this->guide;
    }

    public function setGuide(?Guide $guide): self
    {
        $this->guide = $guide;

        return $this;
    }
}
