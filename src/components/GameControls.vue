<template>
    <v-card>
        <v-card-title v-if="game.id">
            Game {{game._id}} {{game.state}}
        </v-card-title>
        <v-card-text v-if="game.state == 'IN_PROGRESS'">
            Move: {{game.currentMove}}
        </v-card-text>
        <v-card-text v-if="game.state == 'FINISHED'">
            Winner: {{game.winner ? game.winner.name : 'BOT'}}
        </v-card-text>
        <v-card-actions v-if="game.state == 'IN_PROGRESS'">
            <div>
                Attack
                <v-btn-toggle v-model="attack" mandatory>
                    <v-btn flat>
                        <v-icon>format_align_left</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>format_align_center</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>format_align_right</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
            <div>
                Defense
                <v-btn-toggle v-model="defense" mandatory>
                    <v-btn flat>
                        <v-icon>format_align_left</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>format_align_center</v-icon>
                    </v-btn>
                    <v-btn flat>
                        <v-icon>format_align_right</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div>
                <v-btn color="blue" @click="playWithBot()" v-if="game.state != 'IN_PROGRESS'">Play with bot</v-btn>
                <v-btn color="green" @click="move()" v-if="game.state == 'IN_PROGRESS'">Make a Move</v-btn>
                <v-btn color="red" @click="endGame()" v-if="game.state == 'IN_PROGRESS'">End Game</v-btn>
                <v-btn color="orange" @click="endGame()" v-if="game.state == 'FINISHED'">Close Game</v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      attack: 0,
      defense: 0
    };
  },
  computed: {
    ...mapState({
      gameState: state => state.game
    }),
    ...mapGetters('game', {
      game: 'getCurrentGame'
    })
  },
  methods: {
    playWithBot() {
      this.$store.dispatch('game/startWithBot');
    },
    move() {
      let hitcode = (this.attack + 1) * 10 + (this.defense + 1);
      this.$store.dispatch('game/move', hitcode);
    },
    endGame() {
      this.$store.dispatch('game/endGame');
    }
  }
};
</script>
