import { reactive } from 'vue'

export const auth = reactive({
    
    "user": {
        name : "Kaspars",
        surname: "Žēpers",
        code: "IT21071",
        favorite_songs: []
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
    if (this.user.favorite_songs.indexOf(songID) >= 0){
        this.user.favorite_songs.push(songID);
        localStorage.favorite_songs = this.user.favorite_songs;
    }else{
        console.log("song already in favorites")
    };
},

getFavoriteSongs() {
    return this.user.favorite_songs;
}
})