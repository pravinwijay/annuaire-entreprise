<?php
// src/Controller/AuthController.php
namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthController extends AbstractController
{
    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, UtilisateurRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // Chercher l'utilisateur par email
        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);
        }

        // Vérifier le mot de passe (ici, vous devriez utiliser un service de sécurité Symfony pour vérifier le mot de passe crypté)
        if ($user->getMdp() !== $password) {
            return new JsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);
        }

        // Répondre avec les données de l'utilisateur
        return new JsonResponse([
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
            'is_admin' => $user->isAdmin(), // Assurez-vous que ce champ est renvoyé
        ]);
    }
}

?>