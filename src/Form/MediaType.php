<?php

    namespace App\Form;

    use App\Entity\Media;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Vich\UploaderBundle\Form\Type\VichImageType;

    class MediaType extends AppType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {

            $arrayoption = array_merge(
                $this->getConfForm("", "+", "uploadFile img", ["accept", "image/*"])
            , [ 'required' => true,
                'allow_delete' => true,
                'delete_label' => '...',
                'download_label' => '...',
                'download_uri' => true,
                'image_uri' => true,
                'asset_helper' => true,
            ]);

            $builder->add('imageFile', VichImageType::class, $arrayoption);

        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Media::class,
            ]);
        }
    }


