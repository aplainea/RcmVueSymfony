<template>
  <v-app>
    <!-- Header app -->
    <v-app-bar fixed elevate-on-scroll color="#ffffff">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> <!-- icon for responsive menu -->
      <v-toolbar-title>
        <router-link to="/">
        <h3 class="font-weight-bold">{{ title }}</h3>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="panierAccess" color="primary" elevation="2" large outlined class="btn-panier"><v-icon>mdi-cart</v-icon>Panier</v-btn>
      <v-btn v-if="!auth" color="#28a745" elevation="2" large outlined><v-icon>mdi-login</v-icon>Connexion</v-btn>
      <v-btn v-if="auth" color="#dc3545" elevation="2" large outlined><v-icon>mdi-logout</v-icon>Deconnexion</v-btn>
    </v-app-bar>

    <!-- Responsive menu -->
    <v-navigation-drawer v-model="drawer" temporary width="350px" fixed>
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item v-if="roleUser === 'ROLE_ADMIN'">
            <v-list-item-icon><v-icon>mdi-shield-account</v-icon></v-list-item-icon>
            <v-list-item-title>
              <a href="/admin">Administration</a>
            </v-list-item-title>
          </v-list-item>
          <v-banner single-line v-if="roleUser === 'ROLE_ADMIN'"></v-banner>
          <router-link to="/commandes">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-storefront</v-icon></v-list-item-icon>
            <v-list-item-title>Historique de vos commandes</v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link to="/recettes">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-bookshelf</v-icon></v-list-item-icon>
            <v-list-item-title>Toutes les recettes</v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link :to="{name: 'AllRecipes', params: {category: 'Entrée'}}">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-food-croissant</v-icon></v-list-item-icon>
            <v-list-item-title>Les entrées</v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link :to="{name: 'AllRecipes', params: {category: 'Plat'}}">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-food</v-icon></v-list-item-icon>
            <v-list-item-title>Les plats</v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link :to="{name: 'AllRecipes', params: {category: 'Dessert'}}">
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-food-apple</v-icon></v-list-item-icon>
            <v-list-item-title>Les desserts</v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Main page -->
    <v-main>
      <v-banner single-line></v-banner>
      <!-- router page -->
      <router-view/>
    </v-main>

    <v-footer>
        <div>Copyright Antoine Plaineau 2021</div>
    </v-footer>

  </v-app>

</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    title: "Recette Cuisine Maison",
    auth: true,
    roleUser: "ROLE_ADMIN"
  }),
  computed: {
    panierAccess() {
      return !!(this.auth && this.roleUser);
    }
  }
};
</script>
