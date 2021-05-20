<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SocialMediaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('fb_link', TextType::class, [
                    'property_path' => '[fb_link]',
                    "label" => "Facebook",
                    "required" => false,
                    'attr' => [
                        "placeholder" => "votre profil Facebook",
                        "class" => "form-control",

                ]])
            ->add('ig_link', TextType::class, [
                    'property_path' => '[ig_link]',
                    "label" => "Instagram",
                    "required" => false,
                    'attr' => [
                        "placeholder" => "votre profil Instagram",
                        "class" => "form-control",

                ]]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
        ]);
    }
}
