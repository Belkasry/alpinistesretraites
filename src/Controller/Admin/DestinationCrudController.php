<?php

namespace App\Controller\Admin;

use App\Entity\Destination;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class DestinationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Destination::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            TextField::new('longitude'),
            TextField::new('latitude'),
            TextareaField::new('description')->onlyOnForms(),
            AssociationField::new('parent'),
        ];
    }

}
