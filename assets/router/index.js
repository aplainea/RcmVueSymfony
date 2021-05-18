import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from "../components/Recipe";
import AllRecipes from "../components/AllRecipes";
import CommandsHistory from "../components/CommandsHistory";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recettes/:id',
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/recettes/:category?',
    name: 'AllRecipes',
    component: AllRecipes
  },
  {
    path: '/commandes',
    name: 'CommandsHistory',
    component: CommandsHistory
  },
  {
    path: '*', // chemin par défaut
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
