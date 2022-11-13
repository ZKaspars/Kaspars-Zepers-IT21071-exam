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
    <Header v-if=authCheck>
<h1> logged </h1>
    </Header>


    <div id="section-body">
        <nav id="nav-main">
    <NavigationComponent v-if="authCheck">

</NavigationComponent>
</nav>
<div id="section-player" v-if="authCheck">
        <AudioPlayer />
    </div>
    <router-view class="section-router"></router-view>
    </div>

</template>
