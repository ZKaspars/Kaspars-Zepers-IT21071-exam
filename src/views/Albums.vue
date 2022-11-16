<script>
import IconGrid from "../components/icons/IconGrid.vue";
import IconList from "../components/icons/IconList.vue";
import songs from "../data/songs.js"
import { player } from "../stores/player";

export default{
    components: { IconGrid, IconList },
    mounted() {
        
        console.log() // I'm text inside the component.
        },
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
        getYear(data){
            return data.slice(0,4)
        },
        getSongCount(data){
            if (data == 1){
                return data+" song"
            }else{
                return data+" songs"
            }
        },
        getArtists(list){
            return list?.map(artist => artist.name).join(', ');
        },
        selectAlbum(song) {
            //console.log(song)
            if (this.doubleClick.lastID == song.id){
                this.doubleClick.count++;
                if (this.doubleClick.count > 1){
                    player.setPlaylist(song?.trackList)
                    player.setNowPlaying(player.playlist[0])
                    this.doubleClick.count = 0;
                }
                console.log(this.doubleClick.count)
            }
            else{
                this.doubleClick.lastID = song.id;
                this.doubleClick.count = 1;
                player.setPlaylist(song?.trackList)
                console.log(song)
                console.log(this.doubleClick.count)
            }
            },
        makeAlbums(){
            this.songlist.forEach(element => {
                if (this.store_albums.indexOf(element?.album.id) != -1){
                        this.store_albums.album_info.push(element.album)
                }else{
                    console.log(this.store_albums?.album_id?.indexOf(element?.album.id))
                }
                //console.log(element.album.id)
                //console.log(this.store_albums.id.indexOf(element.album.id))
                //console.log(((this.store_albums?.album_id?.indexOf(element?.album.id)) != -1))
                })
                console.log(this.store_albums)
            },
        },
    computed:
    {
        albums: function() {
            let albumArray = [];
            let newone = []

// create albums            
            songs.forEach(elem =>{
                let alb = elem.album
                let exists = 0;
                albumArray.forEach( el =>{
                    if(el.id == alb.id){
                        exists = 1;
                    }else{
                    }
                })
                if (exists == 0){
                    alb.trackList = [];
                    albumArray.push(alb)
                }
            })
// add tracks (breaks player because somehow adds undefined as first track, no idea how to fix)
            
            albumArray.forEach(alb =>{
                songs.forEach(aSong => {
                    if(alb.id == aSong.album.id){
                        newone = alb.trackList
                            alb.trackList.push(aSong)
                        
                    }
                });
            })

console.log(albumArray)
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
            <button id="btn-grid"> 
                <IconGrid :class="{ active : this.gridMode}"  @click="this.gridMode = !this.gridMode" />
             </button>
            <button id="btn-list">
                <IconList :class="{ active : !this.gridMode}"  @click="this.gridMode = !this.gridMode" />
            </button>
        </div>
    </div>
    <ul id="list-albums" :class="{ 'grid' : this.gridMode == true}">
        <li class="album" v-for="(value, key, index) in this.albums " @click="selectAlbum(value)">
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