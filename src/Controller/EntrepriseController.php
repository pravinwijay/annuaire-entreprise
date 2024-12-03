<?php

namespace App\Controller;

use App\Entity\Entreprise;
use App\Entity\Utilisateur;
use App\Repository\EntrepriseRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class EntrepriseController extends AbstractController
{
    #[Route('/api/entreprises', name: 'add_entreprise', methods: ['POST'])]
    public function addEntreprise(
        Request $request,
        EntrepriseRepository $entrepriseRepository
    ): JsonResponse {
        // Récupérer l'utilisateur connecté
        $user = $this->getUser();

        // Vérifier si l'utilisateur est authentifié
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié'], 401);
        }

        // Vérifier si l'utilisateur est un administrateur
        if (!$user instanceof Utilisateur) {
            return new JsonResponse(['error' => 'Utilisateur non valide'], 403);
        }

        // Récupérer les données de la requête
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['nom'], $data['secteur'], $data['nbEmploye'], $data['contact'], $data['image'])) {
            return new JsonResponse(['error' => 'Données invalides ou incomplètes.'], 400);
        }

        // Créer une nouvelle entreprise
        $entreprise = new Entreprise();
        $entreprise->setNom($data['nom']);
        $entreprise->setSecteur($data['secteur']);
        $entreprise->setNbEmploye((int) $data['nbEmploye']);
        $entreprise->setContact($data['contact']);
        $entreprise->setImage($data['image']);

        // Sauvegarder l'entreprise dans la base de données
        $entrepriseRepository->save($entreprise, true);

        return new JsonResponse(
            [
                'message' => 'Entreprise ajoutée avec succès.',
                'entreprise' => [
                    'id' => $entreprise->getId(),
                    'nom' => $entreprise->getNom(),
                    'secteur' => $entreprise->getSecteur(),
                    'nbEmploye' => $entreprise->getNbEmploye(),
                    'contact' => $entreprise->getContact(),
                    'image' => $entreprise->getImage(),
                ],
            ],
            201
        );
    }
}
