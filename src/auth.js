import { reactive } from 'vue'

export const auth = reactive({
    
    "user": {
        name : "Kaspars",
        surname: "Žēpers",
        code: "IT21071",
        favorite_songs: ["5Vfxmlc1dVQQHlRFC4M05Y","7dzxHJXCcwUy9M3ztiqbum", "5Vfxmlc1dVQQHlRFC4M05Y", "5tDjiBYUsTqzd0RkTZxK7u"]
    },

is_authenticated : true,

setUserData(name, surname, code) {
    this.name = user.name;
    this.surname = user.surname;
    this.code = user.code;
},

authenticate(email, password) {
    if (email != "kaspars.zepers@va.lv"){
        alert("wrong email");
    }
    if (password != "123456"){
        alert("wrong password");
    }else{
        alert("auth success");
        localStorage.is_authenticated = true;
        this.is_authenticated = true;
        router.push('/')
    }
},

logout() {
    localStorage.clear();
    localStorage.is_authenticated = false;
    router.push({ path: '/login' });
},

toggleFavorite(songID) {
    if (this.user.favorite_songs.indexOf(songID) > -1){
        let tempo = this.user.favorite_songs.indexOf(songID)
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