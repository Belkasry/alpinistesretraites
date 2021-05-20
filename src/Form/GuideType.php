<?php

    namespace App\Form;

    use App\Entity\Guide;
    use App\Entity\ValeurReferentiel;
    use App\Entity\Ville;
    use App\Repository\ValeurReferentielRepository;
    use Doctrine\DBAL\Types\ArrayType;
    use Doctrine\ORM\EntityManager;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use Symfony\Component\Form\Extension\Core\Type\CollectionType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\IntegerType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Vich\UploaderBundle\Form\Type\VichFileType;
    use Vich\UploaderBundle\Form\Type\VichImageType;

    class GuideType extends AppType
    {


        public function buildForm(FormBuilderInterface $builder, array $options)
        {

            $activites = $options['activites'];
            $villes = $options['villes'];
            $builder
                ->add('nom', TextType::class, $this->getConfForm("Nom", "votre nom"))
                ->add('prenom', TextType::class, $this->getConfForm("Prénom", "votre prenom"))
//                ->add('age',IntegerType::class,$this->getConfForm("Age","votre age"))
                ->add('phone', TextType::class, $this->getConfForm("Téléphone", "votre numero de telephone"))
                ->add('description', TextareaType::class, $this->getConfForm("Bio", "votre bio", "", ["rows", "8"]))
//                ->add('location', TextType::class, $this->getConfForm("Localisation", "votre localisation"))
                ->add('imageFile', VichImageType::class, $this->getConfForm("Photo de profil", "Uploadez votre photo de profil", "uploadFile img", ["accept", "image/*"]))
                ->add('links', SocialMediaType::class)
                ->add('activites', EntityType::class, [
                        "choices" => $activites,
                        'choice_value' => 'libelle',
                        "class" => ValeurReferentiel::class,
                        'choice_label' => function (ValeurReferentiel $vr) {
                            return sprintf('(%d) %s', $vr->getId(), $vr->getLibelle());
                        },
                        'expanded' => false, 'multiple' => true,
                        'attr' =>
                            [
                                "autocomplete" => "off",
                                'class' => 'chosen-select',
                            ]
                    ]
                )
                ->add('location', EntityType::class, [
                        "choices" => $villes,
                        'choice_value' => 'ville',
                        "class" => Ville::class,
                        'choice_label' => function (Ville $vr) {
                            return sprintf('%s ',  $vr->getVille(),$vr->getRegion()->getRegion());
                        },
                        'group_by' => function(Ville $vr) {
                            return $vr->getRegion()->getRegion();
                        },
                        'expanded' => false,
                        'multiple' => false,
                        'attr' =>
                            [
                                "autocomplete" => "on",
                                'class' => 'chosen-select chosen-select-1',
                            ]

                    ]
                );


            $builder->add('imageFile', VichImageType::class, [
                'required' => true,
                'allow_delete' => true,
                'delete_label' => '...',
                'download_label' => '...',
                'download_uri' => true,
                'image_uri' => true,
                'asset_helper' => true,
            ]);

        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setRequired('activites');
            $resolver->setRequired('villes');
            $resolver->setDefaults([
                'data_class' => Guide::class,
            ]);
        }

    }
