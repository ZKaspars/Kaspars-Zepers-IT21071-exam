<script>
import { auth } from '../auth.js'

export default{
    data(){
        return{
        }
    },
    methods:{
        logoutClick(){
        auth.logout()
        },
    },
    computed:{
        full_name: function() { 
            return auth.user.name +" " + auth.user.surname
        }
    }
}
</script>
<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{full_name}} </h3>
            </div>
            <button id="btn-logout" @click="logoutClick()">LOGOUT</button>
        </div>
    </div>
</template>
