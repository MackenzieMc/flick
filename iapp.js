//create app object
const galleryApp = {};

galleryApp.apiUrl = 'https://api.unsplash.com/photos';

galleryApp.apiKey = 'ArHGx4hEpyjFOlJgpG0KDXthVrVyLGkgVvw-pOx86KQ';

//create an initilization method
galleryApp.init = () => {
    galleryApp.getPhotos();
};

//create a new method which will request information from the API
galleryApp.getPhotos = () => {
    //use the URL constructor to create our endpoint and specify the parameters we want to include
    const url = new URL(galleryApp.apiUrl);
    url.search = new URLSearchParams({
        // pass in our API key as a parameter
        client_id: galleryApp.apiKey
    });
    fetch(url).then(function (apiResponse) {
        return apiResponse.json();
    })
    .then((jsonResponse) => {
        galleryApp.displayPhotos(jsonResponse);
    }) 
};

//build a method that will display photos on the front end 
galleryApp.displayPhotos = (dataFromApi) => {
    //Target the element where we want to append our photos (gallery.ul)
    const ul = document.querySelector('.gallery');
    dataFromApi.forEach( (imageObject) => {
        //Create list item element
        const listElement = document.createElement('li');
        //Create img element
        const image = document.createElement('img');
        //Add src and alt attr to images
        image.src = imageObject.urls.regular
        image.alt = imageObject.alt_description
        //Append img to parent li
        listElement.appendChild(image);
        //Append the list item into the gallery ul
        ul.appendChild(listElement);
    });
};

galleryApp.init();

