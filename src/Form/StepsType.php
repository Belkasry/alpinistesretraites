<?php

    namespace App\Form;

    use App\Entity\StepExperience;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
    use FOS\CKEditorBundle\Form\Type\CKEditorType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class StepsType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('title')
                ->add('resume', CKEditorType::class, array('config' => array('toolbar' => 'full'),))
                ->add('duree')
                ->add('lieu');
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => StepExperience::class,
            ]);
        }
    }
