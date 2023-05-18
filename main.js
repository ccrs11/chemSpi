import {searchByName} from "./search.js"
const search = document.querySelector('#searchButton');

search.addEventListener('click',(e) => {
    e.preventDefault();
    searchByName();

})
