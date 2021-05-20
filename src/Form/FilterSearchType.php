<?php

    namespace App\Form;

    use App\Data\Search;
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

    class FilterSearchType extends AppType
    {


        public function buildForm(FormBuilderInterface $builder, array $options)
        {

            $builder
                ->add('name', TextType::class,
                    ["required" => false, "attr" => ["placeholder" => "Par nom"]])
                ->add('localization', TextType::class,
                    ["required" => false, "attr" => ["placeholder" => "Par localisation"]]);
//        );exit;
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Search::class,
                'method' => 'POST',
                'csrf_protection' => false
            ]);
        }

        public function getBlockPrefix()
        {
            return '';
        }

    }
