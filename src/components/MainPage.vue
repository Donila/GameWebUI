<template>
  <v-container column>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
        <GameControls></GameControls>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 v-if="game.id && game.state != 'ABANDONED'">
        <PlayerInfo :player="game.p1"></PlayerInfo>
      </v-flex>

      <v-flex xs12 sm6 v-if="game.id && game.state != 'ABANDONED'">
        <PlayerInfo :player="game.p2"></PlayerInfo>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import MovesHistory from './MovesHistory';
import GameControls from './GameControls';
import PlayerInfo from './PlayerInfo';

export default {
  components: {
    MovesHistory,
    GameControls,
    PlayerInfo
  },
  computed: {
    ...mapState({
      userState: state => state.user.logged,
      gameState: state => state.game
    }),
    ...mapGetters('game', {
      game: 'getCurrentGame'
    }),
    ...mapGetters('user', {
      user: 'getLoggedUser'
    })
  },
  methods: {
    playWithBot() {
      this.$store.dispatch('game/startWithBot');
    },
    move() {
      this.$store.dispatch('game/move', 11);
    },
    endGame() {
      this.$store.dispatch('game/endGame');
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.go();
    }
  }
};
</script>
