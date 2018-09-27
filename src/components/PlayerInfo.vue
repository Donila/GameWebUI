<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{player.user ? player.user.name : 'BOT'}}</h3>
                <v-progress-circular
                    :rotate="-90"
                    :size="150"
                    :width="15"
                    :value="hpPercentage()"
                    color="primary"
                    >
                    {{ player.hp }} / {{player.startingHp}}
                </v-progress-circular>
            </div>
        </v-card-title>

        <MovesHistory :moves="game.moveResults" :p1="p1" :p2="p2"></MovesHistory>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import MovesHistory from './MovesHistory';

export default {
  components: { MovesHistory },
  props: ['player'],
  computed: {
    ...mapGetters('game', {
      game: 'getCurrentGame'
    }),
    p1() {
      return this.player.user ? 'p2' : 'p1';
    },
    p2() {
      return this.player.user ? 'p1' : 'p2';
    }
  },
  methods: {
    hpPercentage() {
      let perc = (this.player.hp * 100) / this.player.startingHp;
      return perc;
    }
  }
};
</script>