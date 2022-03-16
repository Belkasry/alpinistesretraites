<?php

    namespace App\DataFixtures;

    use App\Entity\Guide;
    use App\Entity\Referentiel;
    use App\Entity\User;
    use App\Entity\ValeurReferentiel;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

    class AppFixtures extends Fixture
    {


        /**
         * AppFixtures constructor.
         */
        public function __construct(UserPasswordEncoderInterface $encoder)
        {
            $this->encoder=$encoder;
        }

        public function load(ObjectManager $manager)
        {
          
//            $arrayName = array("Abad", "Abdennasser", "Amghar", "Abbas",
//                "Abdelmoula", "Amimar", "Abbou", "Allal",
//                "Amine", "Abdelaalim", "Abdennour", "Amjad",
//                "Abdelaati", "Abderaouf", "Ammar", "Abdeladim",
//                "Abderrafie", "Amrane", "Abdelali", "Abderrazak",
//                "Anis", "Abdelaziz", "Abdessabour", "Anouar",
//                "Abdelbadie", "Abdessadek", "Antar", "Abdelbaki",
//                "Abdessafi", "Antara", "Abdelbasset", "Abdessalam",
//                "Aouab", "Abdelfattah", "Abdessamad", "Aouiss",
//                "Abdelghafour", "Abdessamie", "Arbi", "Abdelghani",
//                "Abdessatar", "Archane", "Abdelhadi", "Abdou");
//            $i = 0;
//            while ($i < 20) {
//                $guide = new Guide();
//                $guide->setNom($arrayName[mt_rand(0, count($arrayName) - 1)])
//                    ->setPrenom($arrayName[mt_rand(0, count($arrayName) - 1)])
//                    ->setAge(29)
//                    ->setDescription("Guide des montagnes")
//                    ->setLocation("Imlil - Marakech")
//                    ->setPhone("0" . rand(600000000, 699999999));
//
//                $rand = mt_rand(1, 50);
//                $guide->setImageProfil("i.pravatar.cc/150?img=$rand");
//
//                $manager->persist($guide);
////                $manager->flush();
//                $i++;
//            }
            $this->remplirTypeActivite($manager);

        }

        public function remplirTypeActivite(ObjectManager $manager)
        {
            $arrayType = ["Montagne", "Escalade", "Alpinisme", "VTT", "Spéléo", "Ski", "Randonnée", "Trekking", "Multi-Activités", "Colo", "Canyoning", "Kayak", "Rafting", "Desert", "Rando Chamelier", "Trek Desert", "Kayak de mer", "Surf", "Plongée"];

            $ref = new Referentiel();
            $ref->setLibelle("Type Activité");
            $manager->persist($ref);
            foreach ($arrayType as $type) {
                $valref = new ValeurReferentiel();
                $valref->setLibelle($type)
                    ->setIdRef($ref);
                $manager->persist($valref);
            }
            $manager->flush();

        }

        public function remplirUser(ObjectManager $manager)
        {

            $user = new User();
            $user->setLogin("test");
            $user->setEmail("test@gmail.com");
            $user->setBirthday(new \DateTime('2011-01-01'));
            $user->setPasswordHash($this->encoder->encodePassword($user,"test"));
            $user->setRoles(["ROLE_ADMIN"]);
            $user->setToken("123a");
            $manager->persist($user);
            $manager->flush();
        }
    }
