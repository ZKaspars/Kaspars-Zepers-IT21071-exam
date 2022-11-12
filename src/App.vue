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
    <NavigationComponent v-if="authCheck">

</NavigationComponent>
    <div id="section-body">

    </div>
    <div id="section-player" v-if="authCheck">
        <AudioPlayer />
    </div>
</template>
