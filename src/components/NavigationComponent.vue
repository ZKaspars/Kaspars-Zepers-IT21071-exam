<script>
export default{
    data(){
        return{
            links : [
                {
                    path: "/",
                    name: "SONGS"
                },
                {
                    path: "/albums",
                    name: "ALBUMS"
                },
                {
                    path: "/about",
                    name: "ABOUT"
                }

            ]
        }
    }
}
</script>
<template>
    <nav id="nav-main" class="wrapper-navigation">
    <ol v-for="value in this.links">
        <router-link :to=value.path> {{value.name}} </router-link>
    </ol>
</nav>
</template>
