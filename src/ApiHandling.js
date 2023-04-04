import axios from 'axios'

export default (()=>{
    // let accessToken = "3857598397800039";
    // let baseURL = `https://superheroapi.com/api/${accessToken}/`;
    // axios.defaults.baseURL = 'https://superheroapi.com';
    // axios.defaults.headers.common['Authorization'] = "3857598397800039";

    let baseURL = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/`;
    return {
        getALL() {
            let getALLComicCharacters = `${baseURL}all.json`;
            return axios.get(getALLComicCharacters).then((response) => {
                return response.data;
           });
        },
        getById(characterID){
            let getById = `${baseURL}id/${characterID}.json`;
            return axios.get(getById).then((response) => {
                return response.data;
           });
        }
    }
 })();