<?php
    /**
     * Created by PhpStorm.
     * User: belka
     * Date: 24/02/2021
     * Time: 11:13
     */

    namespace App\Form;

    use App\Entity\Guide;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\IntegerType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;



    class AppType  extends AbstractType
    {

        protected function getConfForm($label, $placeholder="",$class="",$options=[])
        {
            $attr=array();
            $attr=['class' => "$class",'placeholder' => '' . $placeholder];


            if (count($options)>0){
                $attr[$options[0]]=$options[1];
            }


            $arrayConf['label']=$label;
            $arrayConf['attr']=$attr;

            return $arrayConf;
        }



    }