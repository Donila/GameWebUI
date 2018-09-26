<template>
    <v-layout row>
        <v-flex sm4>
            <v-layout v-for="move in moves" :key="move._id" column>
              <!-- <v-flex>
                <div>p1: {{move[p1]hitcode}}, A: {{getAtk(move[p1]hitcode)}}, D: {{getDef(move[p1]hitcode)}}</div>
                <div>p2: {{move[p2].hitcode}}, A: {{getAtk(move[p2].hitcode)}}, D: {{getDef(move[p2].hitcode)}}</div>
              </v-flex> -->
              <v-flex row>
                <span v-for="i in 3">
                  <span v-if="isBlocked(i, move)"> T </span>
                  <span v-else-if="isBlock(i, move)"> O </span>
                  <span v-else-if="isHit(i, move)"> X </span>
                  <span v-else> - </span>
                </span>
                <span> (<span v-if="move[p1].damage > 0">-</span>{{move[p1].damage}}) </span>
              </v-flex>
          </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
let players = { p1: 'p1', p2: 'p2' };

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
    }
  }
};
</script>