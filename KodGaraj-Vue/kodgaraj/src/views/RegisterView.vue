<template>
    <v-form class="px-3">
        <v-text-field label="Name" v-model="name"></v-text-field>
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
                name:'',
                email:'',
                password:'',
            }
        },
        methods:{
            async submit(){
                let data = JSON.stringify({
                    "name": this.name,
                    "email": this.email,
                    "password": this.password
                });

                await axios("auth/register", data)
                .then((response) => {
                console.log(JSON.stringify(response.data));
                })
                .catch((error) =>{
                console.log(error);
                });
                this.$router.push('/')
            }
        }
    }

</script>