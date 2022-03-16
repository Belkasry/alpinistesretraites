<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
class DefaultController extends AbstractController
{
    /**
     * @Route("/accompagnateur")
     * @Route("/accompagnateur/{type}")
     * @Route("/accompagnateur/profil/{id}")
     * @Route("/experience/profil/{id}")
     * @Route("/experience")
     * @Route("/experience/{type}")
     */
    public function index(): Response
    {
     
// header('Content-Type: text/plain');
// echo "Current PHP version: ", phpversion(), "\n";
// echo "*** OPENSSL_CONF\n";
// var_dump(getenv('OPENSSL_CONF'));
// echo "\n*** Errors before calling openssl_pkey_new\n";
// while (($e = openssl_error_string()) !== false) {
//     var_dump($e);
// }
// echo "\n*** Calling openssl_pkey_new\n";
// var_dump(openssl_pkey_new());
// echo "\n*** Errors after calling openssl_pkey_new\n";
// while (($e = openssl_error_string()) !== false) {
//     var_dump($e);
//     exit;
// }
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

}
