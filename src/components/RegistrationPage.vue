<template>
<v-layout align-center justify-center>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
    <v-toolbar dark color="primary">
        <v-toolbar-title>Registration form</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat @click="goToLogin()">Login</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
        <Register></Register>
    </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import Register from './Register';

export default {
  components: {
    Register
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>