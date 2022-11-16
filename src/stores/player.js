import { reactive } from 'vue'

export const player = reactive({
    playlist   : [],
    now_playing: {}, // SONG OBJECT

    setPlaylist(songs) {
        this.playlist = songs;
    },
    setNowPlaying(song) {
        this.now_playing = song;
    },
    getNowPlayingSongId() {
        return this.now_playing?.id;
    },
    getNowPlayingSongIndex(){
        let i = 0;
        for(i = 0 ; i < this.playlist.length;i++){
            if (this.getNowPlayingSongId()== this.playlist[i].id){
                return i
            }
        }
    },
    getNowPlaying() {
        return this.now_playing;
    },
    getNowPlayingAlbumID() {
        return this.now_playing?.album?.id ?? null;
    },
    getNowPlayingSongName() {
        return this.now_playing?.name ?? '';
    },
    getNowPlayingSongImage() {
        return this.now_playing?.album?.images[1].url ?? '';
    },
    getNowPlayingArtists() {
        return this.now_playing?.artists?.map(artist => artist.name).join(', ');
    },
    getNowPlayingSongPreview() {
        return this.now_playing?.preview_url;
    },
    getNextSong(){
        let saved = this.getNowPlayingSongIndex()
        if (this.playlist[saved+1] != -1){
            return this.playlist[saved+1];
        }else{
            return false;
        }
    },
    getPreviousSong() {
        let saved = this.getNowPlayingSongIndex()
        if (this.playlist[saved-1] != -1){
            return this.playlist[saved-1];
        }else{
            return false;
        }
    },
    resetNowPlaying() {
        this.now_playing = {};
    }
})