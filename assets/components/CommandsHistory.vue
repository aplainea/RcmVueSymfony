<template>
  <v-container class="container">
    <h1 class="text-center mb-4">Historique de vos commandes</h1>
    <div v-if="!users || !orders || !recipes">
      <h2 class="text-center ma-5">Vous n'avez aucune commande pour l'instant.</h2>
    </div>

    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            <h2>N° commande</h2>
          </th>
          <th class="text-left">
            <h2>Commandé le</h2>
          </th>
          <th class="text-left">
            <router-link to="/recettes">
              <h2>Recette(s) <v-icon>mdi-open-in-new</v-icon></h2>
            </router-link>
          </th>
          <th class="text-left">
          </th>
        </tr>
        </thead>
        <tbody v-for="order in orderByUser()" :key="order.id">
        <tr>
          <td>{{ order['id'] }}</td>
          <td>{{ (new Date(order['date'])).toLocaleDateString() }}</td>
          <td>
            <router-link :to="{name: 'Recipe', params: {id: order.recipe['id']}}">{{ recipeName(order.recipe['id']) }}</router-link>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text depressed>Voir la vidéo</v-btn>
              </template>
              <span>Bientôt disponible</span>
            </v-tooltip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import Axios from "../api/axios";

export default {
  name: 'CommandsHistory',
  data() {
    return {
      users: null,
      orders: null,
      recipes: null,
    }
  },
  mounted () {
    // users
    Axios().get('users?page=1')
        .then(response => this.users = response.data['hydra:member'])
        .catch(error => console.log(error))
    // orders
    Axios().get('orders?page=1')
        .then(response => this.orders = response.data['hydra:member'])
        .catch(error => console.log(error))
    // recipes
    Axios().get('recipes?page=1')
        .then(response => this.recipes = response.data['hydra:member'])
        .catch(error => console.log(error))
  },
  methods: {
    currentUsers() {
      if(this.$store.state.login) {
        return this.users.filter(user => user.name === this.$store.state.login)[0]['id']
      } else {
        return this.users
      }
    },
    orderByUser() {
      if(this.currentUsers()) {
        return this.orders.filter(order => order.user.id === this.currentUsers())
      } else {
        return this.orders
      }
    },
    recipeName(id) {
      return this.recipes.filter(recipe => recipe.id === id)[0]['name']
    }
  },

}
</script>