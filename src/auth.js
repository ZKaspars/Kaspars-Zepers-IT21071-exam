import { reactive } from 'vue'
//import router from './router/index.js'

export const auth = reactive({
    "user": {
        name : "Kaspars",
        surname: "Žēpers",
        code: "IT21071",
        favorite_songs: []
    },

is_authenticated : localStorage.is_authenticated ?? false,

setUserData(name, surname, code) {
    this.user.name = name;
    this.user.surname = surname;
    this.user.code = code;
},

authenticate(email, password) {
    if (email != "kaspars.zepers@va.lv"){
        alert("wrong email")
    }
    if (password != "123456"){
        alert("bad password")
    }else{
        localStorage.is_authenticated = true;
        this.is_authenticated = true;
        router.push('/')
    }
},

logout() {
    localStorage.clear();
    localStorage.is_authenticated = false;
    router.push('/')
},

toggleFavorite(songID) {
    let tempo = this.user.favorite_songs.indexOf(songID)
    if (tempo > -1){
        this.user.favorite_songs.splice(tempo, 1);
        localStorage.favorite_songs = this.user.favorite_songs;
    }else{
        this.user.favorite_songs.push(songID)
        localStorage.favorite_songs = this.user.favorite_songs;
    }
},
getFavoriteSongs() {
    return this.user.favorite_songs;
}
})