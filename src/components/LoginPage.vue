<template>
    <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat @click="goToRegister()">Register</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
            <Login></Login>
        </v-card-text>
        </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import Login from './Login';

export default {
  components: {
    Login
  },
  methods: {
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

