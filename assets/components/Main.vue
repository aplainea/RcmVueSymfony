<template>
  <v-container class="container">
    <div v-if="recipes">
      <div v-for="category in categories" :key="category">
        <h1 class="mt-5 mb-3">Quelques {{ category.toLowerCase() + "s"}} en exemple</h1>
        <v-row>
          <v-col v-for="recipe in filterRecipes(category).slice(0, 3)" :key="recipe.id" class="d-flex flex-column">
            <v-card class="mx-auto flex d-flex flex-column" max-width="344">
              <v-img :src="imageUrl(recipe.picture)" width="100%" height="47.923vh"></v-img>
              <v-card-title>{{ recipe.name }}</v-card-title>
              <v-card-subtitle>{{ recipe.description }}</v-card-subtitle>
              <router-link :to="{name: 'Recipe', params: {id: recipe.id}}">
                <v-card-actions>
                  <v-btn text>Voir la recette</v-btn>
                </v-card-actions>
              </router-link>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      </div>
    </div>
    <div v-else class="text-center">
      <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
      ></v-progress-circular>
      <p>Trop long ? Contacter un administrateur (code: API ERROR)</p>
    </div>
  </v-container>
</template>

<script>

import Axios from "../api/axios";

export default {
  name: 'Main',
  data() {
    return {
      categories: ["Entrée", "Plat", "Dessert"],
      recipes: null,
    }
  },
  created() {
    Axios().get('recipes?page=1')
        .then(response => this.recipes = response.data['hydra:member'])
        .catch(error => console.log(error))
  },
  methods: {
    imageUrl(p) {
      return require('../../public/uploads/images/recipes/'+p)
    },
    filterRecipes(categoryName) {
      return this.recipes.filter(recipe => recipe.category.name === categoryName)
      /*
      let filterRecipes = [];
      for(let index in this.recipes) {
        let recipe = this.recipes[index];
        if(categoryName === recipe.category.name) {
          filterRecipes.push(recipe);
        }
      }
      return filterRecipes;
       */
    },
  },
}
</script>
