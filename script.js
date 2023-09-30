const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imgloaded = 0;
let totalimg = 0;
let photosArray = [];

let count = 7;
const apiKey = "L33vu7BVdDOcphQed_nW3wcm15aMUeL6eSrbz0rFMas";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imgLoader() {
  imgloaded++;
  if (imgloaded == totalimg) {
    ready = true;
    loader.hidden = true;
    console.log("ready", ready);
    count = 20;
  }
  console.log("img loaded");
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imgloaded = 0;
  totalimg = photosArray.length;
  console.log("totalimg", totalimg);
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const image = document.createElement("img");

    setAttributes(image, {
      // href: photo.links.html,
      // target: "_blank",
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // image.setAttribute("src", photo.urls.regular);
    // image.setAttribute("alt", photo.alt_description);
    // image.setAttribute("title", photo.alt_description);
    imgContainer.addEventListener("load", imgLoader());
    item.appendChild(image);
    imgContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
  } catch (error) {
    console.log("hello");
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log("getmore");
    ready = false;
    getPhotos();
  }
});
getPhotos();
