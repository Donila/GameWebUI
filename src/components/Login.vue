<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Submit
    </v-btn>
    
    <v-snackbar color="error"
      v-model="snackbar"
      :multi-line="true"
      :timeout="timeout"
      :top="true"
    >
      {{ msg }}
      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  data: () => ({
    drawer: null,
    valid: true,
    email: '',
    password: '',
    msg: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Minimum 6 symbols'
    ],
    select: null,
    timeout: 5000,
    snackbar: false
  }),
  props: {
    source: String
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('user/login', {
            username: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push('/play');
          })
          .catch(err => {
            this.msg = 'Wrong username or password';
            this.snackbar = true;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
