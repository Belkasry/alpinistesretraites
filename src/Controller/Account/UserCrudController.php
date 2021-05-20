<?php

namespace App\Controller\Account;

use App\Entity\Guide;
use App\Entity\User;
use Doctrine\DBAL\Types\TextType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->add(Crud::PAGE_INDEX, Action::DETAIL)
            ->remove(Crud::PAGE_DETAIL, Action::INDEX)
            ->remove(Crud::PAGE_DETAIL, Action::DELETE)
            ;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
        TextField::new('login'),
        TextField::new('password_hash')->setFormType(PasswordType::class)->onlyOnForms(),
        DateField::new('birthday'),
    ];
    }

    


}
