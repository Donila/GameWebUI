<template>
<v-app id="inspire">
  <v-content>
    <v-container fluid fill-height>
      <router-view></router-view>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
console.log(process.env.NODE_ENV);

export default {};
</script>
