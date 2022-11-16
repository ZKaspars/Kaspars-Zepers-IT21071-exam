<script>
import NavigationComponent from './components/navigationComponent.vue';
import { advancePositionWithClone } from '@vue/compiler-core';
import  { auth }  from './auth.js'
export default{
    data(){
        return{
            authCheck: auth.is_authenticated,
        }
    }
}


</script>

<template>
    <Header v-if=authCheck ></Header>
    <div id="section-body">
        <NavigationComponent v-if=authCheck ></NavigationComponent>
        <router-view class="section-router"></router-view>
    </div>
    <div v-if=authCheck id="section-player">
        <AudioPlayer />
    </div>
</template>
