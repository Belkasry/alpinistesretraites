<?php

    namespace App\Form;

    use App\Entity\ValeurReferentiel;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\DomCrawler\Field\ChoiceFormField;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\CollectionType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class ActivitesType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $activites = $options['activites'];
            $builder
                ->add('activites', EntityType::class, [

                        "label" => " ",
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
                                'name'=>'[activites]'
                            ],
                        'property_path' => '[activites]',
                    ]
                );
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setRequired('activites');
            $resolver->setDefaults([
            ]);
        }
    }
