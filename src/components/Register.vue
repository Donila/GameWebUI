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
    <div>{{msg}}</div>
  </v-form>
</template>

<script>
import backend from '../services/backend';
import axios from 'axios';

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
    select: null
  }),
  props: {
    source: String
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        backend
          .post('/users', { email: this.email, password: this.password })
          .then(res => {
            return res.data;
          })
          .then(data => {
            this.$router.push('/play');
          })
          .catch(err => {
            this.msg = JSON.stringify(err);
            console.log(err);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

