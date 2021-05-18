<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Recipe;
use App\Entity\Order;
use App\Repository\OrderRepository;
use App\Repository\RecipeRepository;
use http\Client\Curl\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class RecipeController extends AbstractController
{

     /**
     * @Route("/", name="home")
     */
    public function home()
    {
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/recettes/{slug}", name="recipepage")
     */
    public function showRecipe(Recipe $recipe, SessionInterface $session, RecipeRepository $recipeRepository, OrderRepository $orderRepository): Response
    {
        // Vérifie si la recette a déjà été commandé par l'utilisateur connecté
        $onHistoryCommands = false;
        $currentUser = $this->getUser()->getId();
        $orders = $orderRepository->findBy(['user' => $currentUser]);

        foreach ($orders as $order) {
            if ($order->getRecipe()->getName() == $recipe->getName()) {
                $onHistoryCommands = true;
            }
        }

        // Vérifie si la recette est déjà dans le panier de l'utilisateur connecté
        $onPanier = false;
        $panierData = [];

        $panier = $session->get('panier', []);
        foreach ($panier as $idOnpanier => $id){
            $panierData[] = [
                'recette' => $recipeRepository->find($id),
            ];
        }

        foreach ($panierData as $item) {
            if ($item["recette"] == $recipe) {
                $onPanier = true;
            }
        }


        return $this->render('recipe/recipe.html.twig', [
            'recipe' => $recipe,
            'onPanier' => $onPanier,
            'onHistoryCommands' => $onHistoryCommands
        ]);
    }
}
