<?php

    namespace App\Entity;

    use App\Repository\UserRepository;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Component\Security\Core\User\UserInterface;
    use Symfony\Component\Validator\Constraints as Assert;
    use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
    use ApiPlatform\Core\Annotation\ApiResource as ApiResource;
    use ApiPlatform\Core\Annotation\ApiFilter as ApiFilter;
    use Symfony\Component\Serializer\Annotation\Groups;
    use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
    use Symfony\Component\Serializer\Annotation\SerializedName;
    use ApiPlatform\Core\Annotation\ApiProperty;

    /**
     * @ApiResource(
     *  normalizationContext={"groups"={"read"}},
     *  denormalizationContext={"groups"={"write"}},
     *   paginationItemsPerPage=30
     * )
     * @ORM\Entity(repositoryClass=UserRepository::class)
 *  * @UniqueEntity(
     *     fields={"email"},
     *     message="Email déja utilisé"
     * )
     * @UniqueEntity(
     *     fields={"login"},
     *     message="Login déja utilisé"
     * )
     * @ApiFilter(SearchFilter::class, properties={"id": "exact","login":"exact","subscription":"exact"})
     * @ORM\HasLifecycleCallbacks()
     */
    class User implements UserInterface
    {


        /**
         * @ORM\Id
         * @ORM\GeneratedValue
         * @Groups({"read"})
         * @ORM\Column(type="integer")
         */
        private $id;


        /** @ORM\Column(type="json")
         * @Groups({"read"})
         */
        private $roles = [];

        /**
         * @Groups({"read","write"})
         * @ORM\Column(type="string", length=255)
         */
        private $login;

        /**
         * @Groups({"write"})
         * @ORM\Column(type="string", length=255)
         */
        private $password_hash;

        /**
         * @Assert\EqualTo(propertyPath="password_hash" , message="Mot de pass non identique")
         */
        public $password_confirm;

        /**
         * @Groups({"read","write"})
         */
        public $plain_password;


        /**
         * @Groups({"read","write"})
         * @ORM\Column(type="string", length=255)
         */
        private $email;


        /**
         * @ORM\OneToOne(targetEntity=Guide::class, cascade={"persist", "remove"})
         * @Groups({"read"})
         */
        private $guide;

        // /**
        //  * @ORM\OneToOne(targetEntity=Utilisateur::class, cascade={"persist", "remove"})
        //  * @Groups({"read","write"})
        //  */
        // private $utilisateur;

        /**
         * @Groups({"read","write"})
         * @ORM\Column(type="datetime")
         */
        private $birthday;

        /**
         * @Groups({"write","read"})
         * @ORM\Column(type="string", length=255)
         */
        private $token;


        /**
         * @ORM\Column(name="statut", type="boolean", nullable=true)
         */
        private $statut;

        /**
         * @Groups({"read"})
         * @ORM\OneToOne(targetEntity=Subscription::class, mappedBy="user", cascade={"persist", "remove"})
         */
        private $subscription;


        

        /**
         * @return mixed
         */
        public function getStatut()
        {
            return $this->statut;
        }

        /**
         * @param mixed $statut
         */
        public function setStatut($statut): void
        {
            $this->statut = $statut;
        }


        /**
         * @return mixed
         */
        public function getToken()
        {
            return $this->token;
        }

        /**
         * @param mixed $token
         */
        public function setToken($token): void
        {
            $this->token = $token;
        }

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getLogin(): ?string
        {
            return $this->login;
        }

        public function setLogin(string $login): self
        {
            $this->login = $login;

            return $this;
        }

        public function getPasswordHash(): ?string
        {
            return $this->password_hash;
        }

        public function setPasswordHash(string $password_hash): self
        {
            $this->password_hash = $password_hash;

            return $this;
        }

        public function getEmail(): ?string
        {
            return $this->email;
        }

        public function setEmail(string $email): self
        {
            $this->email = $email;

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
        
        // public function getUtilisateur(): ?Utilisateur
        // {
        //     return $this->utilisateur;
        // }

        // public function setUtilisateur(?Utilisateur $utilisateur): self
        // {
        //     $this->utilisateur = $utilisateur;

        //     return $this;
        // }

        /** @ORM\PrePersist */
        public function doStuffOnPostPersist()
        {
            $from = $this->getBirthday();
            $to = new \DateTime('today');
            if ($this->guide != null)
                $this->guide->setAge($from->diff($to)->y);

            // if ($this->utilisateur != null)
            //     $this->utilisateur->setAge($from->diff($to)->y);
        }

        public function getBirthday(): ?\DateTimeInterface
        {
            return $this->birthday;
        }

        public function setBirthday(\DateTimeInterface $birthday): self
        {
            $this->birthday = $birthday;

            return $this;
        }

        public function getRoles(): array
        {
            return array_unique(array_merge(['ROLE_USER'], $this->roles));
        }

        public function setRoles(array $roles)
        {
            $this->roles = $roles;
        }

        public function resetRoles()
        {
            $this->roles = [];
        }

        /**
         * Returns the salt that was originally used to encode the password.
         *
         * This can return null if the password was not encoded using a salt.
         *
         * @return string|null The salt
         */
        public function getSalt()
        {
            // TODO: Implement getSalt() method.
        }

        /**
         * Returns the username used to authenticate the user.
         *
         * @return string The username
         */
        public function getUsername()
        {
            return $this->getLogin();
        }

        /**
         * Removes sensitive data from the user.
         *
         * This is important if, at any given point, sensitive information like
         * the plain-text password is stored on this object.
         */
        public function eraseCredentials()
        {
            // TODO: Implement eraseCredentials() method.
        }

        /**
         * Returns the password used to authenticate the user.
         *
         * This should be the encoded password. On authentication, a plain-text
         * password will be salted, encoded, and then compared to this value.
         *
         * @return string|null The encoded password if any
         */
        public function getPassword()
        {
            return $this->getPasswordHash();
        }


        public function addRole($role)
        {
            $role = strtoupper($role);

            if (empty($this->roles) || !in_array($role, $this->roles, true)) {
                $this->roles[] = $role;
            }

            return $this;
        }

        public function getSubscription(): ?Subscription
        {
            return $this->subscription;
        }

        public function setSubscription(?Subscription $subscription): self
        {
            // unset the owning side of the relation if necessary
            if ($subscription === null && $this->subscription !== null) {
                $this->subscription->setUser(null);
            }

            // set the owning side of the relation if necessary
            if ($subscription !== null && $subscription->getUser() !== $this) {
                $subscription->setUser($this);
            }

            $this->subscription = $subscription;

            return $this;
        }


    }