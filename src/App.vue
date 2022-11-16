<script>
import NavigationComponent from './components/navigationComponent.vue';
import  { auth }  from './auth.js'
export default{
    data(){
        return{
            authCheck: auth.is_authenticated,
        }
    },
    methods:{
        logoutClick(){
            auth.logout()
        }
    }
}
</script>

<template>
    <Header v-if=authCheck ></Header>
    <div id="section-body">
        <NavigationComponent v-if=authCheck ></NavigationComponent>
        <router-view class="section-router"></router-view>
    <div v-if=authCheck id="section-player">
        <AudioPlayer />
    </div>
</div>
</template>
