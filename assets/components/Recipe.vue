<template>
  <v-container class="container">
    <v-card v-if="recipe">
      <v-card-title class="mb-3">
        <h1>{{ recipe.name }} ({{ recipe.category.name.toLowerCase() }})</h1>
      </v-card-title>
      <v-card-subtitle class="mt-2 mb-2">
        <p>{{ recipe.description }}</p>
      </v-card-subtitle>
      <v-img :src="imageUrl(recipe.picture)" width="100%" height="47.923vh"></v-img>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row class="mb-4">
              <v-col>
                <v-row>
                  <div class="pr-2">Temps de préparation:</div>
                  <div>{{ recipe.preparationtime }}</div>
                </v-row>
              </v-col>
              <v-col>
                <v-row class="justify-end">
                  <div>Pour {{ recipe.nbperson }} personne(s)</div>
                </v-row>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <h3 class="mb-2">Ingredient(s)</h3>
            <p>{{ recipe.ingredient }}</p>
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-col>
          <v-btn color="green" text>Prendre la vidéo recette</v-btn>
          <!--<v-btn color="grey" text>Vous possédez déjà cette vidéo recette (Historique de vos commandes)</v-btn>-->
        </v-col>
        <v-col class="d-flex justify-end">
          <h2>{{ recipe.price }} €</h2>
        </v-col>
      </v-card-actions>
    </v-card>
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
import Axios from '../api/axios'
Axios()


export default {
  name: 'Recipe',
  props: {
    recipeProps: Object
  },
  data() {
    return {
      recipe: null,
      id: this.$route.params.id,
    }
  },
  created () {
    if(this.recipeProps){
      this.recipe = this.recipeProps;
    } else {
      Axios().get('recipes/'+ this.id)
          .then(response => this.recipe = response.data)
          .catch(error => console.log(error))
    }
  },
  methods: {
    imageUrl(p) {
      return require('../../public/uploads/images/recipes/'+p)
    },
  }
}
</script>