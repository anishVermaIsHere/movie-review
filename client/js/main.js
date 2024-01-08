import { renderMovieCard } from "./util.js";
import { MOVIE_URL, SEARCH_API_URL } from "./constant.js";


const searchForm = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const row = document.querySelector("#row");


row.innerHTML=await renderMovieCard(MOVIE_URL);
formEvent();

function formEvent(){
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = search.value;
        if (!query) {
            alert('Please enter any movie name ');
            return;
        }
        row.innerHTML = await renderMovieCard(SEARCH_API_URL + query);
    });

}
