import { IMG_PATH_URL } from "./constant.js";

export async function renderMovieCard(url){
    const response=await fetch(url);
    const {results}=await response.json();

    const cards=results.map((item)=>{
        return `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card">
            <img src=${IMG_PATH_URL}${item.poster_path} class="card-img-top"
                alt=${item.original_title} style="height:20rem" />
            <div class="card-body">
                <h5 class="card-title">${item.original_title}</h5>
                <p class="card-text ">
                    Release: 
                    <span class="text-success">
                    ${new Date(item.release_date).toDateString()}
                    </span>
                </p>
                <div class="d-flex align-items-center flex-wrap gap-2">
                Ratings: <small class="bg-primary text-white p-1" style="border-radius:0.375rem">${item.vote_average.toFixed(2)} </small>
                
                Votes:<small class="bg-primary text-white p-1" style="border-radius:0.375rem"> ${item.vote_count}</small>
                </div>

                <div class="mt-3">
                    <a href="./pages/review.html?id=${item.id}&title=${item.original_title}" title="movie review">
                        Reviews
                    </a>
                </div>
            </div>
            </div>
        </div>
        `
    }).join('');

    return cards;

  }
  