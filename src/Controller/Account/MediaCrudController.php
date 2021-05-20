<?php

    namespace App\Controller\Account;

    use App\Entity\Guide;
    use App\Entity\Media;
    use App\Entity\ValeurReferentiel;
    use App\Form\ActivitesType;
    use App\Form\MediaType;
    use App\Form\SocialMediaType;
    use App\Repository\GuideRepository;
    use App\Repository\ValeurReferentielRepository;
    use Doctrine\ORM\Mapping\Builder\FieldBuilder;
    use EasyCorp\Bundle\EasyAdminBundle\Collection\FieldCollection;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
    use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
    use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
    use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
    use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
    use EasyCorp\Bundle\EasyAdminBundle\Provider\FieldProvider;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\DomCrawler\Field\FileFormField;
    use Symfony\Component\Form\Extension\Core\Type\CollectionType;
    use Vich\UploaderBundle\Form\Type\VichImageType;

    class MediaCrudController extends AbstractCrudController
    {

        public static function getEntityFqcn(): string
        {
            return Guide::class;
        }

        public function configureActions(Actions $actions): Actions
        {
            return $actions
                ->add(Crud::PAGE_INDEX, Action::DETAIL)
                ->remove(Crud::PAGE_DETAIL, Action::INDEX)
                ->remove(Crud::PAGE_DETAIL, Action::DELETE);
        }


        public function configureResponseParameters(KeyValueStore $responseParameters): KeyValueStore
        {
            return parent::configureResponseParameters($responseParameters); // TODO: Change the autogenerated stub
        }

        public function configureFields(string $pageName): iterable
        {
            $builder = [
                CollectionField::new('medias')
                    ->setEntryType(MediaType::class)
                    ->setCssClass("container_media")
                    ->onlyOnForms()
                    ->setLabel(false),
                CollectionField::new('medias')
                    ->setEntryType(MediaType::class)
                    ->setTemplatePath("media.html.twig")
                    ->onlyOnDetail(),

            ];


            return $builder;

        }

        public function configureAssets(Assets $assets): Assets
        {
            return $assets
                ->addHtmlContentToHead("
                 <style>.container_media{ display: grid !important ; align-items: normal !important ;}</style>")
                 ->addHtmlContentToBody("
                 <script>
                    $(document).ready(
                        function(){ 
                            $('#Guide_medias').addClass('container row '); 
                            $('#Guide_medias .form-group').addClass('col-4 align-self-start'); 
                            $('.col-form-label').remove(); 
                            $('.data-row dd').remove(); 
                        }
                    );
                </script>");
        }

        ///Guide_medias class d-flex flex-wrap
        /// $('#Guide_medias').addClass('d-flex flex-wrap')
        /// form-group class col
        ///
        /// .container_media{display: grid !important};
    }
