<script>
import { auth } from '../auth.js'

export default {
  data() {
    return {
        email: [],
        password: []
    }


  },
  methods: {
    authCall(email, password){
       // alert(`${email}, ${password}`)
        auth.authenticate(email,password);
    }
  }
}
  
 /* computed: {
    inputsReceived() {
     if (email.length() > 0 && password.length() > 6){
       return false;
    }else{
        return true;
     }
    }
  }
}*/
</script>


<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input type="email" v-model="email" id="input-email" placeholder="E-mail" />
            <input type="password" v-model="password" id="input-password" placeholder="Password" />
            <button @click="authCall(email,password)" id="btn-submit" v-bind:disabled="(password.length<6 || email.length<1)">LOGIN</button>

        </form>
    </div>
</template>

