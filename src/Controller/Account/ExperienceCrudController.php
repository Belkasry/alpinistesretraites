<?php

    namespace App\Controller\Account;

    use App\Entity\Destination;
    use App\Entity\Experience;
    use App\Entity\Guide;
    use App\Form\ExperienceType;
    use App\Form\MediaType;
    use App\Form\StepsType;
    use Doctrine\ORM\QueryBuilder;
    use EasyCorp\Bundle\EasyAdminBundle\Collection\FieldCollection;
    use EasyCorp\Bundle\EasyAdminBundle\Collection\FilterCollection;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
    use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
    use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
    use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
    use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
    use EasyCorp\Bundle\EasyAdminBundle\Dto\FieldDto;
    use EasyCorp\Bundle\EasyAdminBundle\Dto\FilterDataDto;
    use EasyCorp\Bundle\EasyAdminBundle\Dto\SearchDto;
    use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
    use EasyCorp\Bundle\EasyAdminBundle\Field\HiddenField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
    use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
    use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
    use Symfony\Component\Asset\Packages;
    use Symfony\Component\DomCrawler\Field\FormField;
    use Symfony\Component\Security\Core\Security;
    use Symfony\Component\Validator\Constraints\GreaterThan;
    use Symfony\Component\Validator\Constraints\LessThanOrEqual;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class ExperienceCrudController extends AbstractCrudController
    {

        private $security;

        public static function getEntityFqcn(): string
        {
            return Experience::class;
        }

        public function __construct(Security $security)
        {
            $this->security = $security;
        }


        public function createIndexQueryBuilder(SearchDto $searchDto, EntityDto $entityDto, FieldCollection $fields, FilterCollection $filters): QueryBuilder
        {
            /** @var QueryBuilder $result */
            $result = parent::createIndexQueryBuilder($searchDto, $entityDto, $fields, $filters);
            $result->andWhere('entity.guide = :val')
                ->setParameter('val', $this->security->getUser()->getGuide()->getId());
            return $result;
        }


        public function configureFields(string $pageName): iterable
        {
            $builder = [
                TextField::new('title', 'Titre'),
                IntegerField::new('dificulte', "Difficulté"),
                IntegerField::new('duree', "Durée"),
                IntegerField::new('nbr_participant', "Nombre de place"),
                IntegerField::new('nbr_participant_restant', "Nombre de places restantes")
                    ->setFormTypeOptions(
                        ['constraints' =>
                            [
                                new LessThanOrEqual([
                                    'propertyPath' => 'parent.all[nbr_participant].data'
                                ])
                            ]
                        ]

                    ),
                MoneyField::new('prix')->setCurrency("MAD"),
                TextareaField::new('description'),
                AssociationField::new('activites'),
                AssociationField::new('guide')->setFormTypeOptions([
                    'data' => $this->security->getUser()->getGuide(),
                ])->setCssClass("d-none")->onlyOnForms(),
                Field::new('etat'),
                Field::new('fixe')->setFormTypeOptions([
                    "data" => false,
                ]),
                DateField::new('start')->setFormTypeOptions([
                ]),
                DateField::new('finish')->setFormTypeOptions([
                ]),
                AssociationField::new('destination'),
                CollectionField::new('steps')
                    ->setEntryType(StepsType::class),
                ArrayField::new('requirement'),
                ArrayField::new('notice'),
                CollectionField::new('medias')
                    ->setLabel("Medias")
                    ->setEntryType(MediaType::class),


            ];
            return $builder;
        }
//git aaaa

//    public function configureActions(Actions $actions): Actions
//    {
//        return $actions
//            ->add(Crud::PAGE_INDEX, Action::DETAIL)
//            ->remove(Crud::PAGE_DETAIL, Action::INDEX)
//            ->remove(Crud::PAGE_DETAIL, Action::DELETE);
//    }


//    public function createIndexQueryBuilder(SearchDto $searchDto, EntityDto $entityDto, FieldCollection $fields, \EasyCorp\Bundle\EasyAdminBundle\Collection\FilterCollection $filters): QueryBuilder
//    {
//        $em = $this->getDoctrine()->getManagerForClass(Experience::class);
//        $qb = $em->createQueryBuilder('d');
//
////            $qb = $qb->AndWhere('d.title like :val')
////                ->setParameter('val', "%{toubkal}%");
//
//
//
//        return $qb;
//    }

//
//    public function configureResponseParameters(KeyValueStore $responseParameters): KeyValueStore
//    {
//        return parent::configureResponseParameters($responseParameters); // TODO: Change the autogenerated stub
//    }


        public function configureAssets(Assets $assets): Assets
        {
            $button = "<a class=\"btn btn-primary btn-block mb-3\" data-toggle=\"collapse\" href=\".Experience_medias_collapse\" role=\"button\" aria-expanded=\"true\" aria-controls=\"Experience_medias_collapse\"> <i class=\"action-icon fa fa-angle-double-down pr-2\" ></i>Medias</a>";
            return $assets
                ->addHtmlContentToBody("
                <style>.form-widget-compound{width: 80% !important;}</style>    
                <script>
                $(document).ready(function () {
                      var exp_me = $('#Experience_medias').closest('.form-widget-compound');
                       $('$button').insertBefore(exp_me);
                      exp_me.addClass(' collapse Experience_medias_collapse')
                      $('#Experience_medias').addClass(' d-flex flex-wrap align-items-baseline');
                      $('#Experience_medias .form-group').addClass(' w-25 p-2');
                    $('#Experience_fixe').change(function() {
                    if(this.checked) {
                       $('#Experience_start').prop( 'disabled', false );
                       $('#Experience_finish').prop( 'disabled', false );
                    }else{
                         $('#Experience_start').prop( 'disabled', true );
                       $('#Experience_finish').prop( 'disabled', true );
                    }
                    });
                    
                 });
                </script>");
        }
    }
