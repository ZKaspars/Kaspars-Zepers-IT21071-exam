<script>
import songs from "../data/songs.js"
import IconCaretUp from "../components/icons/IconCaretUp.vue";
import IconHeart from "../components/icons/IconHeart.vue";
import IconPlay from '../components/icons/IconPlay.vue';
import {player} from "../stores/player.js"
import {auth} from '../auth.js'

export default {
    components: { IconCaretUp, IconPlay, IconHeart },
    mounted() {
        
    },
    data(){
        return{
            songlist : songs,
            search: '',
            show_favorites: false,
            sortReverse: false,
            sortingBy: "none",
            doubleClick: {
                lastID: "",
                count : 0
            },
        }
    },
    methods: {
        resetClick() {
            this.doubleClick.count = 0;
        },
        addFavorite(songID){
            auth.toggleFavorite(songID)
        },
        isFavorited(songID){ // checks if song id is in favorites
            let temp = auth.getFavoriteSongs()
            if (temp.indexOf(songID) != -1){
                return true;
            }else{
                return false
            }
        },
        getArtists(list){ // puts all arrays in one text
            return list?.map(artist => artist.name).join(', ');
        },
        playActivated(){
            return player.getNowPlayingSongId() 
        },
        getTime(duration){ // returns time in minutes and seconds from milliseconds
            var seconds = Math.floor((duration / 1000) % 60), 
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return minutes + ":" + seconds
        
        },
        selectSong(song) { // selects the song if it has been clicked twice 
            if (this.doubleClick.lastID == song.id){
                this.doubleClick.count++;
                if (this.doubleClick.count > 1){
                    player.setPlaylist(this.filtered_songs)
                    player.setNowPlaying(song)
                    this.doubleClick.count = 0;
                }
            }
            else{
                this.doubleClick.lastID = song.id;
                this.doubleClick.count = 1; // enables doubleclicking
                setTimeout(() => this.doubleClick.count = 0, 600);
            }

            },
        
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        favoriteView(){ // toggle favorite mode
            this.show_favorites = !this.show_favorites
        },
        toggleFavorites(songID){ // adds or removes song to favorites
            auth.toggleFavorite(songID)
        },
        sorting(criteria){ 
            if (criteria == null ){ // if receives null, returns unorganized list
                return this.songlist
            }
            else if (this.sortingBy == criteria){ // switches to reverse sort if clicking same button twice
                this.sortReverse = !this.sortReverse
            }else{
                this.sortingBy = criteria; // changes sortingBy value to remember last clicked button
                this.sortReverse = false;
            }
            if (this.sortingBy == "title"){
                if (this.sortReverse == true){ // returns reversed order if clicked again
                    return this.songlist.sort((a, b) => (a.name > b.name ? -1 : 1)); 
                }else{// returns normal order if clicked once
                    return this.songlist.sort((a, b) => (a.name > b.name ? 1 : -1));
                }
            }
            if (this.sortingBy == "duration"){ // same as above
                if (this.sortReverse == true){
                    return this.songlist.sort((a, b) => (a.duration_ms > b.duration_ms ? -1 : 1));
                }else{
                    return this.songlist.sort((a, b) => (a.duration_ms > b.duration_ms ? 1 : -1));
                }
            }
        },
    },
     computed: {
    filtered_songs: function() { 
        if (this.show_favorites){ // in favorites mode goes through each song, and if index is present in favorite song array, displays it
        return this.songlist.filter((songs) => {
            if(auth.getFavoriteSongs().indexOf(songs.id) != -1 && songs.name.toLowerCase()?.match(this.search?.toLowerCase())){ // after && enables searching
                return true;
            }else{
                return false;
            }
        })
    }else{
            return this.songlist.filter((songs) => {
            return songs.name.toLowerCase()?.match(this.search?.toLowerCase());// enables searching in normal mode (not favorites)
                });
            }
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
                    Title <IconCaretUp v-if="sortingBy == 'title'" style= "stroke: red" :class="{ active: 'true', 'flip-vertical': sortReverse} "/>
                </th>
                
                <th id="th-artist">Artist</th>
                <th id="th-album">Album</th>
                <th id="th-duration" :class="{ active: sortingBy == 'duration'}" @click="sorting('duration')">
                    Duration <IconCaretUp v-if="sortingBy == 'duration'" style= "stroke: red" :class="{ 'flip-vertical': sortReverse}"/>
                </th>
            </tr>
                <tr class="song" v-for="(value, key) in filtered_songs " :class="{active: playActivated() == value?.id}" @click= "selectSong(value)">
                <td id= "td-index">
                    <div v-if="(playActivated() == value?.id)" ><IconPlay/></div> 
                    <div v-if="!(playActivated() == value?.id)">{{key+1}}</div>
                    <span id="txt-index"></span>
                </td>
                <td id="td-title">
                    <img :src= "`${value?.album?.images[1]?.url}`"/>
                    {{value?.name}}
                </td>
                <td id ="td-artist">
                    {{getArtists(value?.artists)}}
                </td>
                <td id="td-album">{{value?.album?.name}} </td>
                <td id="td-duration">
                    {{getTime(value?.duration_ms)}}
                        <IconHeart :class="{ active : isFavorited(value?.id)}" @click="toggleFavorites(value.id)"/>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>
