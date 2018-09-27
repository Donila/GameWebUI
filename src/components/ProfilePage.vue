<template>
    <v-card>
        <v-card-title>
            Welcome to The Game, {{user.name}}!
        </v-card-title>

        <v-card-text>
            <v-chip color="primary" text-color="white">
                <v-avatar class="primary darken-4">{{user.stats.lvl}}</v-avatar>
                LEVEL
            </v-chip>
            <v-chip color="red" text-color="white">
                <v-avatar class="red darken-4">{{user.stats.str}}</v-avatar>
                Strength
                <v-icon right @click="increaseStr()" v-if="user.stats.availableStats">add</v-icon>
            </v-chip>
            <v-chip color="green" text-color="white">
                <v-avatar class="green darken-4">{{user.stats.vit}}</v-avatar>
                Vitality
            </v-chip>
            <v-chip color="brown" text-color="white">
                <v-avatar class="brown darken-4">{{user.stats.def}}</v-avatar>
                Defense
            </v-chip>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="logout()">Log Out</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
  computed: {
    ...mapGetters('user', {
      user: 'getLoggedUser'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.go();
    },
    increaseStr() {}
  }
};
</script>

