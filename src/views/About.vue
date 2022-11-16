<script>
import { auth } from '../auth'
import songs from "../data/songs.js"

export default {
        data(){
        return{
            songslist : songs,
            editing : false,
        }
    },
    methods:{
        getArtists(list){ // returns all artists in one line
            return list?.map(artist => artist.name).join(', ');
        },
        toggleEdit(){ // toggles editing mode
            this.editing = !this.editing
        },
        checkFavorites(){ // checks if there is atleast 1 song in favorites
            if (auth.user.favorite_songs.length < 1){
                return false
            }else{
                return true
            }
        },
        getName(){
            return auth.user.name
        },
        getSurname(){
            return auth.user.surname
        },
        getCode(){
            return auth.user.code
        },
        getText(){ // changes button text based on mode
            if(this.editing){
                return "Cancel"
            }else{
                return "Edit"
            }
        },
        saveData(name,surname,code){ // changes user data after clicking save
            auth.setUserData(name,surname,code)
        }
    },
    computed:{
        return_favorites: function() { // returns favorites
            let favArray = [];     
            songs.forEach(elem =>{ // for each song, check if song id can be found
                if(auth.user.favorite_songs.indexOf(elem.id) != -1){
                    favArray.push(elem) // if can be found (id != -1) push it into array
                    }
            })
            return favArray;
        }
    }
}
</script>
<template>
    <div id="about-view">
    <div class="wrapper-header">
        <h1>ABOUT ME</h1>
        <div class="settings">
            <button id="btn-edit" :class="{ active: editing}"  @click="toggleEdit()" > {{getText()}} </button>
            <button id="btn-save" v-if="editing" @click="toggleEdit(), saveData(nameField,surnameField,codeField)">Save Form</button>
        </div>
    </div>
    <form>
        <div class="wrapper-input">
            <label>NAME</label>
            <input id="input-name" v-model="nameField" v-if="editing" />
            <p v-if="!editing" id="txt-name">{{getName()}}</p>
        </div>
        <div class="wrapper-input">
            <label>SURNAME</label>
            <input id="input-surname" v-model="surnameField" v-if="editing" />
            <p v-if="!editing" id="txt-surname">{{getSurname()}}</p>
        </div>
        <div class="wrapper-input">
            <label>STUDENT CODE</label>
            <input id="input-code" v-model="codeField" v-if="editing"/>
            <p v-if="!editing" id="txt-code">{{getCode()}}</p>
        </div>
        <div class="wrapper-songs">
            <label>FAVORITE SONGS</label>
            <ul v-if="checkFavorites()">
                <li v-for="(value) in return_favorites">
                    <img :src= "`${value?.album?.images[1]?.url}`" id="img-album" />
                    <div class="song-info">
                        <p id="txt-song" class="song-name">{{value.name}}</p>
                        <p id="txt-artist" class="song-artists">{{getArtists(value.artists)}}</p>
                    </div>
                </li>
            </ul>
            <div v-if="!checkFavorites()" id="txt-empty" class="empty" > NO SONGS FOUND </div>
        </div>
    </form>
</div>
 </template>