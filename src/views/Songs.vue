<script>
import { reactive } from 'vue'
import songs from "../data/songs.js"
import IconCaretUp from "../components/icons/IconCaretUp.vue";
import IconHeart from "../components/icons/IconHeart.vue";
import IconPlay from '../components/icons/IconPlay.vue';
import {player} from "../stores/player.js"
import {auth} from '../auth.js'

export default {
    components: { IconCaretUp, IconPlay, IconHeart },
    data(){
        return{
            songlist : songs,
            search: '',
            show_favorites: false,
            sortReverse: false,
            sortingBy: "none",
            doubleClick: {
                lastID: "",
                count : 1
            },

        }
    },
    methods: {
        addFavorite(songID){
            auth.toggleFavorite(songID)
        },
        isFavorited(songID){
            let temp = auth.getFavoriteSongs()
            if (temp.indexOf(songID) > 0){
                return true;
            }else{
                return false
            }
        },
        getArtists(list){
            return list?.map(artist => artist.name).join(', ');
        },
        playActivated(){
            return player.getNowPlayingSongId() 
        },
        getTime(duration){
            var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return minutes + ":" + seconds
        
        },
        selectSong(song) {
            if (this.doubleClick.lastID == song.id){
                this.doubleClick.count++;
                if (this.doubleClick.count == 2){
                    player.resetNowPlaying()
                    player.setNowPlaying(null)
                    player.setNowPlaying(song)
                    this.doubleClick.count == 0;
                }
            }
            else{
                this.doubleClick.lastID = song.id;
            }
            },
        
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        favoriteView(){
            this.show_favorites = !this.show_favorites
        },
        toggleFavorites(songID){
            auth.toggleFavorite(songID)
        },
        sorting(criteria){
            if (criteria == null){
                return this.songlist
            }
            else if (this.sortingBy == criteria){
                this.sortReverse = !this.sortReverse
            }else{
                this.sortingBy = criteria;
                this.sortReverse = false;
            }
            if (this.sortingBy == "title"){
                if (this.sortReverse == true){
                    return this.songlist.sort((a, b) => (a.name > b.name ? -1 : 1));
                }else{
                    return this.songlist.sort((a, b) => (a.name > b.name ? 1 : -1));
                }
            }
        if (this.sortingBy == "duration"){
                if (this.sortReverse == true){
                    return this.songlist.sort((a, b) => (a.duration_ms > b.duration_ms ? -1 : 1));
                }else{
                    return this.songlist.sort((a, b) => (a.duration_ms > b.duration_ms ? 1 : -1));
                }
            }
        }
    },
     computed: {
    filtered_songs: function() {
        return this.songlist.filter((songs) => {
            return songs.name.toLowerCase()?.match(this.search?.toLowerCase());
        });
        }
    }
}


</script>
<template>
<div id="songs-view" @scroll="handleScroll">
    <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
            <input v-model="search" id="input-search" placeholder="Search by title..." />
        </div>
        
        <div class="wrapper-settings">
            <button @click="favoriteView()" :class="{ active: show_favorites == true} " id="btn-show-favorites">Show Favorites</button>
        </div>
    </div>
    <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
            <tr ref="header">
                <th id="th-id" >#</th>
                <th id="th-title" :class="{ active: sortingBy == 'title'}" @click="sorting('title')" >
                    Title
                    <IconCaretUp :class="{ 'flip-vertical': sortReverse}"/>
                </th>
                
                <th id="th-artist">Artist</th>
                <th id="th-album">Album</th>
                <th id="th-duration" :class="{ active: sortingBy == 'duration'}" @click="sorting('duration')">
                    Duration
                    <IconCaretUp :class="{ 'flip-vertical': sortReverse}"/>
                </th>
            </tr>
            <!-- Loop goes on this <tr> element -->

                <tr class="song" v-for="(value, key, index) in filtered_songs " @click= "selectSong(value) ">
                <td id= " td-index ">
                    <div v-if="(playActivated() == value?.id)"><IconPlay/></div>
                    <span id="txt-index">{{index}}</span>
                </td>
                <td id="td-title">
                    <img :src= "`${value?.album.images[1].url}`"/>
                    {{value?.name}}
                </td>
                <td id ="td-artist">
                    {{getArtists(value?.artists)}}
                </td>
                <td id="td-album">{{value?.album.name}} </td>
                <td id="td-duration">
                    {{getTime(value?.duration_ms)}}
                    
                        <IconHeart :class="{ active : isFavorited(value?.id)}" @click="toggleFavorites(value.id)"/>
                    
                </td>
            
            </tr>
        </table>
    </div>
</div>
</template>
