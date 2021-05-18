<template>
  <v-container class="container">
    <h1 class="text-center mb-4">Historique de vos commandes</h1>
    <v-simple-table>
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
            <h2>Recette</h2>
          </th>
          <th class="text-left">
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>11 / 05 / 2021</td>
          <td>
            <router-link to="/recette">Roulées au chorizo</router-link>
          </td>
          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text>Voir la vidéo</v-btn>
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
export default {
name: 'CommandsHistory'

}
</script>