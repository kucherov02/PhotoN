const keyAuth = "563492ad6f9170000100000185f7da0fbb524a84967ba158d1c0111c";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submitBtn");
const form = document.querySelector(".search-form");
const moreButton = document.querySelector(".more");
let inputValue = "";
let pageNum = 1;

//Eventlisteners 

searchInput.addEventListener("input", updateSearch);

form.addEventListener("submit",(e)=> {
    e.preventDefault();
    choosePhotos(inputValue)});

moreButton.addEventListener("click", morePhotos);


async function morePhotos(){
    pageNum++;
    let url = `https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`;

    if(inputValue !== ""){
        url = `https://api.pexels.com/v1/search?query=${inputValue}&page=${pageNum}`;
    }
    const data = await fetchApi(url);
    addPhotos(data);
}

function updateSearch(e){
    inputValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url,
        {
            method: "GET",
            headers:{
                Accept: "application/json",
                Authorization: keyAuth
            }
        });
        
        return await dataFetch.json();
}


async function addPhotos(data){
    data.photos.forEach(element => {
    
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <a href=${element.photographer_url}>${element.photographer}</a>
        <a href=${element.src.original} target="_blank">Download</a>
        </div>

        <img src=${element.src.large}>
        `;
        gallery.appendChild(galleryImg);
        });
}

async function choosePhotos(query =""){
    pageNum = 1;
    console.log("1234567");
    clear();
    let url = "https://api.pexels.com/v1/curated?per_page=15&page=1";

    if(query !== ""){
        url = `https://api.pexels.com/v1/search?query=${query}&page=1`;
    }

    const data = await fetchApi(url);
    addPhotos(data);
}

function clear(){
    inputValue =searchInput.value;
    searchInput.value = "";
    gallery.innerHTML = "";
}

 choosePhotos();





 