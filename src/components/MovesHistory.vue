<template>
    <v-layout row align-content-start>
        <v-flex sm12>
            <v-layout v-for="move in moves" :key="move._id" column>
              <!-- <v-flex>
                <div>p1: {{move[p1].hitcode}}, A: {{getAtk(move[p1].hitcode)}}, D: {{getDef(move[p1].hitcode)}}</div>
                <div>p2: {{move[p2].hitcode}}, A: {{getAtk(move[p2].hitcode)}}, D: {{getDef(move[p2].hitcode)}}</div>
              </v-flex> -->
              <v-flex row>
                <span v-for="i in 3">
                  <span v-if="isBlocked(i, move)"><v-icon>highlight_off</v-icon></span>
                  <span v-else-if="isBlock(i, move)"><v-icon>panorama_fish_eye</v-icon></span>
                  <span v-else-if="isHit(i, move)"><v-icon>clear</v-icon></span>
                  <span v-else><v-icon>remove</v-icon></span>
                </span>
                <span class="primary">{{getUserName(p1)}}</span>
                <span v-if="move[p1].damage > 0"> deals </span> 
                <span v-if="move[p1].damage === 0">'s hit was blocked by </span>
                <span class="primary">{{getUserName(p2)}}</span>
                <span v-if="move[p1].damage > 0"> {{move[p1].damage}} damage</span>
              </v-flex>
          </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['moves', 'p1', 'p2'],
  computed: {
    ...mapGetters('game', {
      game: 'getCurrentGame'
    }),
    ...mapGetters('user', {
      user: 'getLoggedUser'
    }),
    playerMasks() {
      return this.moves[this.p1];
    }
  },
  methods: {
    getAtk(hitcode) {
      if (hitcode % 30 < 10) {
        return 3;
      }
      if (hitcode % 20 < 10) {
        return 2;
      }
      return 1;
    },
    getDef(hitcode) {
      let atk = this.getAtk(hitcode);
      return hitcode - atk * 10;
    },

    ifBlock(hitcode1, hitcode2) {
      return this.getAtk(hitcode1) === this.getDef(hitcode2);
    },
    ifHit(hitcode1, hitcode2) {
      return this.getAtk(hitcode1) !== this.getDef(hitcode2);
    },
    ifDef(hitcode1, hitcode2) {
      return this.getDef(hitcode1) !== this.getAtk(hitcode2);
    },

    isBlocked(i, move) {
      return (
        i === this.getAtk(move[this.p1].hitcode) &&
        i === this.getDef(move[this.p2].hitcode)
      );
    },
    isBlock(i, move) {
      return i === this.getDef(move[this.p2].hitcode);
    },
    isHit(i, move) {
      return i === this.getAtk(move[this.p1].hitcode);
    },

    getUserName(player) {
      let p = this.game[player].user;
      return p ? p.name : 'BOT';
    }
  }
};
</script>