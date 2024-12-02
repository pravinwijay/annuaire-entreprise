<?php

namespace App\Controller;

use App\Entity\Entreprise;
use App\Entity\Utilisateur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

class ApiController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/entreprises", name="get_entreprises", methods={"GET"})
     */
    public function getEntreprises(): JsonResponse
    {
        $entreprises = $this->entityManager->getRepository(Entreprise::class)->findAll();
        return $this->json($entreprises);
    }
    
    /**
     * @Route("/api/utilisateurs", name="get_utilisateurs", methods={"GET"})
     */
    public function getUtilisateurs(): JsonResponse
    {
        $utilisateurs = $this->entityManager->getRepository(Utilisateur::class)->findAll();
        return $this->json($utilisateurs);
    } 
}
