<template>
<v-container>
    <v-layout>
        <v-card>
            <v-card-text>
                <v-layout column>
                    <v-flex>
                        <v-chip color="green" text-color="white" v-for="game in games" :key="game.id">{{game.id}}</v-chip>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="purple" @click="getGames()">Retrieve game history</v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
    
</v-container>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', {
      user: 'getLoggedUser'
    }),
    ...mapGetters('game', {
      games: 'getGames'
    })
  },
  methods: {
    getGames() {
      this.$store.dispatch('game/getLastGames');
    }
  }
};
</script>

