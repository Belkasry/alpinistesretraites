<?php

namespace App\Entity;

use App\Repository\ValeurReferentielRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ValeurReferentielRepository::class)
 */
class ValeurReferentiel
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Referentiel::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_ref;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $libelle;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $libelle_ar;

    /**
     * @ORM\ManyToOne(targetEntity=Guide::class, inversedBy="activites")
     */
    private $activites;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdRef(): ?Referentiel
    {
        return $this->id_ref;
    }

    public function setIdRef(?Referentiel $id_ref): self
    {
        $this->id_ref = $id_ref;

        return $this;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getLibelleAr(): ?string
    {
        return $this->libelle_ar;
    }

    public function setLibelleAr(?string $libelle_ar): self
    {
        $this->libelle_ar = $libelle_ar;

        return $this;
    }

    public function getActivites(): ?Guide
    {
        return $this->activites;
    }

    public function setActivites(?Guide $activites): self
    {
        $this->activites = $activites;

        return $this;
    }

    public function __toString()
    {
        return $this->libelle;
    }


}
