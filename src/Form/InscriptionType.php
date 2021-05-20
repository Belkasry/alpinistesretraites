<?php

    namespace App\Form;

    use App\Entity\User;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\CallbackTransformer;
    use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\Form\Extension\Core\Type\EmailType;
    use Symfony\Component\Form\Extension\Core\Type\PasswordType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\IsTrue;

    class InscriptionType extends AppType
    {


        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $activites = $options['activites'];
            $villes = $options['villes'];
            $builder
                ->add('login', TextType::class, $this->getConfForm("Login", "votre Login", "auth-form "))
                ->add('password_hash', PasswordType::class, $this->getConfForm("Mot de Passe", "votre password", "auth-form"))
                ->add('password_confirm', PasswordType::class, $this->getConfForm("Confirmation du Mot de Passe", "Confirmer votre password", "auth-form",
                    ["data-rule-equalTo", "#inscription_password_hash"]))
                ->add('email', EmailType::class, $this->getConfForm("Email", "votre email personnel", "auth-form"))
                ->add('birthday', TextType::class, $this->getConfForm("Date de naissance", "votre date de naissance"))
                ->add('guide', GuideType::class, ["activites" => $activites, "villes" => $villes])
                ->add('agreeTerms',
                    CheckboxType::class,
                    [
                        'attr' => ['class' => 'checkbox', 'id' => "agreeTerms"],
                        'mapped' => false,
                        'constraints' => [new IsTrue(['message' => 'You should agree to our terms.',])],
                    ]
                )//            ->add('sauvegarder', SubmitType::class,$this->getConfForm("Sauvegarder","","btn btn-primary float-right"));
            ;

            $builder->get('birthday')
                ->addModelTransformer(new CallbackTransformer(
                    function ($ddmmyy) {
                        if ($ddmmyy != null) {
                            return \DateTime::createFromFormat('d/m/Y', $ddmmyy)->format('Y-m-d h:i:s');
                        }
                    },
                    function ($YmdHis) {
                        return new \DateTime($YmdHis);
                    }
                ));
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setRequired('activites');
            $resolver->setRequired('villes');
            $resolver->setDefaults([
                'data_class' => User::class,
            ]);
        }
    }
