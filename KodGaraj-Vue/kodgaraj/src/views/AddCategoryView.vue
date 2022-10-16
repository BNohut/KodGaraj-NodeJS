<template>
  <v-form class="px-3">
      <v-text-field label="Category Name" v-model="name"></v-text-field>
      <v-text-field label="Description" v-model="description"></v-text-field>
      <v-btn text class="success mx-0 mt-3" @click="submit">Submit</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'
  export default {
      data(){
          return{
              name:'',
              description:'',
          }
      },
      methods:{
          async submit(){
              let data = JSON.stringify({
                  "name": this.name,
                  "description": this.description
              });

              const response = await axios.post('users/add_category', data)

              console.log(response.data);

          }
      }
  }

</script>