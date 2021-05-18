<template>
  <div>
    <div v-if="recipes">
      <div v-for="recipe in filterRecipes" :key="recipe.id">
        <Recipe :recipeProps="recipe"/>
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
  </div>
</template>

<script>
import Recipe from "./Recipe"
import Axios from "../api/axios";

export default {
  name: 'AllRecipe',
  components: {
    Recipe,
  },
  data() {
    return {
      recipes: null,
      categoryPage: this.$route.params.category,
    }
  },
  mounted () {
    Axios().get('recipes?page=1')
        .then(response => this.recipes = response.data['hydra:member'])
        .catch(error => console.log(error))
  },
  watch: {
    $route(to) {
      this.categoryPage =  to?.params?.category;
    }
  },
  computed: {
    filterRecipes() {
      if(this.categoryPage) {
        return this.recipes.filter(recipe => recipe.category.name === this.categoryPage)
      } else {
        return this.recipes
      }
    },
  },
  methods: {
    imageUrl(p) {
      return require('../../public/uploads/images/recipes/'+p)
    },

  }
}
</script>