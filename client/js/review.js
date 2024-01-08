import { API_URL} from "./constant.js";

const url=new URL(location.href);
const movieId=url.searchParams.get('id');
const movieTitle=url.searchParams.get('title');
let reviewId;
document.querySelector('#movie-title').innerText=`Movie : ${movieTitle}`;

const usernameField=document.querySelector('#review-username');
const reviewField=document.querySelector('#review-description');
const postBtn=document.querySelector('#post');
const reviewForm=document.querySelector('#review-form');
const alertModal=document.querySelector('#alert-modal');


reviewForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!reviewId){
        addReview();
        reviewId='';
    }
    else {
        addReview(reviewId);
        reviewId='';
    };

})

const addReview=(id="")=>{
    if((!usernameField.value)&&(!reviewField.value)){
        return;
    }
    if(id==""){
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({movieId, "user": usernameField.value, "review": reviewField.value})
        })
        .then(res => res.json())
        .then(result => {
          location.reload();
        }).catch(error=>console.log('api eror',error));   
    }
    else {
        updateReview(id);
    }
 
};

const updateReview=(id)=>{
    fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({movieId, "user": usernameField.value, "review": reviewField.value})
    })
    .then(res => res.json())
    .then(result => {
      location.reload();
    }).catch(error=>console.log('api eror',error));   
}

const editReview=(id)=>{
    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      usernameField.value=data.user;
      reviewField.value=data.review;
      postBtn.innerText='Update';
      reviewId=id;

    }).catch(error=>console.log('api eror',error));  
}

const deleteReview=(id)=>{
    fetch(`${API_URL}/${id}`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
    }).catch(error=>console.log('api eror',error));  
};

const deleteAlert=(id)=>{
    alertModal.setAttribute('class','overlay');
    alertModal.innerHTML=`<div class="alert">
        <div class="pb-4">
            Are you sure to delete this review?
        </div>
        <div class="d-flex align-items-center">
            <button class="btn btn-danger me-3" id="del">Delete</button>
            <button class="btn btn-primary " id="cancel">Cancel</button>
        </div>
    </div>`;

    document.querySelector('#del').addEventListener('click',()=>{
        deleteReview(id);
        alertModal.removeAttribute('class');
        alertModal.innerHTML='';
    });
    document.querySelector('#cancel').addEventListener('click',()=>{
        alertModal.removeAttribute('class');
        alertModal.innerHTML='';
    });
};



const renderReviews=()=>{
    const reviewSection=document.querySelector('#reviews-section');
    fetch(`${API_URL}/movie/${movieId}`)
    .then(res=>res.json())
    .then(data=>{
        if(data.length){
            const reviewCard=data.map((review,index)=>{
                return `
                <div class="review-card">
                    <div class="d-flex justify-content-between">
                        <p class="mb-1 fw-bold">${review.user}</p>
                        <div class="d-flex gap-1">
                            <span id="edit${index+1}" class="review-action-icon" title="edit review button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>
                            </span>

                            <span id="delete${index+1}" class="review-action-icon" title="delete review button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"></path></svg>
                            </span>
                        </div>
                    </div>
                    <p class="mb-0 py-2 px-2" style="background:#d8e8ef;border-radius:0.375rem;">${review.review}</p>
                </div>
    
            `;
            
            }).join('');
            reviewSection.innerHTML=reviewCard;

            if(data.length>0){
                data.forEach((review,index)=>{
                    const reviewId=review._id;
                    const editBtn=document.querySelector(`#edit${index+1}`);
                    const deleteBtn=document.querySelector(`#delete${index+1}`);
                    
                    editBtn.addEventListener('click',()=>{
                        editReview(reviewId);
                    });

                    deleteBtn.addEventListener('click',()=>{
                        deleteAlert(reviewId);
                    });
                })   
            }
       
        } else reviewSection.innerHTML=`<h5 class="text-danger">No reviews</h5>`;

    }).catch(error=>console.log('api error',error));

}

renderReviews();
