<template>
  <v-form class="px-3">
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="Password" v-model="password"></v-text-field>
      <v-btn text class="success mx-0 mt-3" @click="submit">Submit</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'
  export default {
      data(){
          return{
              email:'',
              password:'',
          }
      },
      methods:{
          async submit(){
              let data = JSON.stringify({
                  "email": this.email,
                  "password": this.password
              });

              const response = await axios.post("auth/login", data);
              console.log(response.data)
              localStorage.setItem('token', response.data.accessToken);
              this.$router.push('/');

          }
      }
  }

</script>