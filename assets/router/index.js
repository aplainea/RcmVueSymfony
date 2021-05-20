import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from "../components/Recipe";
import AllRecipes from "../components/AllRecipes";
import CommandsHistory from "../components/CommandsHistory";
import Login from "../components/Login";

Vue.use(VueRouter)

const index = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
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
})

export default index

index.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})

