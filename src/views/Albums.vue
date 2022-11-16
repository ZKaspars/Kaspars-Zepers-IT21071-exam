<script>
import IconGrid from "../components/icons/IconGrid.vue";
import IconList from "../components/icons/IconList.vue";
import songs from "../data/songs.js"
import { player } from "../stores/player";

export default{
    components: { IconGrid, IconList },
    data(){
        return{
            songlist: songs,
            gridMode: false,
            store_albums : songs,
            doubleClick: {
                lastID: "",
                count : 0
            },
        }
    },
    mounted() {
        
    },
    methods:{
        getYear(data){ // returns only year of full date
            return data.slice(0,4)
        },
        getSongCount(data){ // picks singular/plural based on amount of songs 
            if (data == 1){
                return data+" song"
            }else{
                return data+" songs"
            }
        },
        getArtists(list){
            return list?.map(artist => artist.name).join(', '); // puts all artists in one line
        },
        selectAlbum(song) { // selects an album when doubleclicked
            if (this.doubleClick.lastID == song.id){
                this.doubleClick.count++;
                if (this.doubleClick.count > 1){
                    player.setPlaylist(song?.trackList) // sets playlist
                    player.setNowPlaying(player.playlist[0]) // plays first song
                    this.doubleClick.count = 0;
                }
            }
            else{
                this.doubleClick.lastID = song.id;
                this.doubleClick.count = 1;
                }
            },
        },
    computed:
    {
        albums: function() {
            let albumArray = [];

// create albums if they dont exist already            
            songs.forEach(elem =>{
                let alb = elem.album
                let exists = 0;
                albumArray.forEach( el =>{
                    if(el.id == alb.id){
                        exists = 1;
                    }
                })
                if (exists == 0){
                    alb.trackList = [];
                    albumArray.push(alb)
                }
            })
// add tracks to an album if the track's properties have the same album ID as current album in loop
            albumArray.forEach(alb =>{
                songs.forEach(aSong => {
                    if(alb.id == aSong.album.id){
                            alb.trackList.push(aSong)
                    }
                });
            })
            return albumArray;
        }
    },
}

</script>
<template>
<div id="album-view">
    <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
            <button id="btn-grid" :class="{ active : this.gridMode}"> 
                <IconGrid  @click="this.gridMode = !this.gridMode"/>
             </button>
            <button id="btn-list" :class="{ active : !this.gridMode}">
                <IconList  @click="this.gridMode = !this.gridMode"/>
            </button>
        </div>
    </div>
    <ul id="list-albums" :class="{ 'grid' : this.gridMode == true}">
        <li class="album" v-for="(value) in this.albums " @click="selectAlbum(value)">
            <img id="img-album" :src= "`${value?.images[0]?.url}`"/>
            <div class="album-info">
                <h4 id="txt-album-name">
                    {{value?.name}}
                </h4>
                <p id="txt-album-artists">{{getArtists(value?.artists)}}</p>
                <div class="album-year">
                    <p id="txt-album-year">{{getYear(value?.release_date)}}</p>
                    <p id="txt-album-tracks">{{getSongCount(value?.trackList.length)}}</p>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>