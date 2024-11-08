
"use strict";

let template = document.querySelector('#swiper-swipe-template').content;
let errorTemplate = document.querySelector('#error-template').content;

let slideData = [];
let likesCount = document.querySelector(".likes-count");
let likeButton = document.querySelector(".like-button");
let popup = document.querySelector(".popup");
let closePopupButton = popup.querySelector(".popup__close");
let slideDescription = document.querySelector(".slide-description");
let slideDescriptionP = slideDescription.querySelector("p");
let slides = document.querySelector(".swiper-wrapper").children;
let prevIndex = 0;
let slidesCount = 0
localStorage.clear();


let swiper = new Swiper(".swiper", {
    navigation: {
        nextEl: ".arrow.forward",
        prevEl: ".arrow.backward",
    },
    speed: 2000,
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: ["-75%", 0, 0],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    allowTouchMove: false,
});

likeButton.addEventListener("click", () => {
    let currentSwipe = slideData[swiper.activeIndex];

    currentSwipe.likes += 1;
    fetch(`http://localhost:3000/slides/${currentSwipe.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currentSwipe),
    });

    likesCount.innerText = currentSwipe.likes;
    localStorage.setItem(currentSwipe.id, true);
    disableOrNotLikeButton(currentSwipe.id, likeButton);

    popup.classList.add("open");

    let activePopup = popup.querySelector(".popup__body");

    activePopup.addEventListener('click', () => {
        popup.classList.remove("open");
    });

});

closePopupButton.addEventListener('click', () => {
    popup.classList.remove("open");
});

swiper.on("activeIndexChange", function () {

    let currentIndex = swiper.activeIndex;
    console.log(currentIndex);
    if (currentIndex + 1 === slidesCount) {
        getImagesAndUpdateSwiper(swiper);
    }

    let currentSlide = slideData[currentIndex];
    console.log('здесь');
    slideUpdate(currentSlide, likesCount, likeButton, prevIndex);

    prevIndex = currentIndex;
});

getImagesAndUpdateSwiper(swiper);



async function updateSlideDescription(currentSlide) {

    slideDescriptionP.classList.add("hide");
    await setTimeout(() => {
        slideDescriptionP.innerText = currentSlide.description;
    }, "1000");

    await setTimeout(() => {
        slideDescriptionP.classList.remove("hide");
    }, "1000");

}

function updateSlideTitle(prevIndex) {
    let currentIndex = swiper.activeIndex;


    let currentSlide = slides[currentIndex];
    let prevSlide = slides[prevIndex];

    prevSlide.querySelector(".slide-title").classList.add("hide");
    currentSlide.querySelector(".slide-title").classList.remove("hide");
}


function slideUpdate(currentSlide, likeText, likeButton, prevIndex) {
    likeText.innerText = currentSlide.likes;
    disableOrNotLikeButton(currentSlide.id, likeButton);
    updateSlideTitle(prevIndex);
    updateSlideDescription(currentSlide);
}


function disableOrNotLikeButton(currentSlideId, button) {
    let isLiked = localStorage.getItem(currentSlideId);

    if (isLiked) {
        button.setAttribute("disabled", '');
    } else {
        button.removeAttribute("disabled", '');
    }
};


async function getImagesAndUpdateSwiper(swiper) {
    let images = await getImages();
    slideData.push(...images);
    getTemplateAndAppendInSwiper(images, swiper);
};


async function getImages() {
    let res = await fetch(`http://localhost:3000/slides?_start=${slidesCount}&_limit=3`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return;
    }

    slidesCount += 3;
    let json = await res.json();
    return json;

};

function getTemplateAndAppendInSwiper(json, swiper) {
    for (let i of json) {
        let newTemplate = template.cloneNode(true);
        let img = newTemplate.querySelector('img');
        let title = newTemplate.querySelector('.slide-title').querySelector('h1');
        img.src = `${i.url}`;
        title.innerText = `${i.title}`;

        swiper.appendSlide(newTemplate);

        if (img.addEventListener) {
            img.addEventListener('error', function () {
                let newErrorTemplate = errorTemplate.cloneNode(true);
                this.replaceWith(newErrorTemplate);
                swiper.updateSlides();
            });
        }
    }
    if (slidesCount < 4) {
        slideUpdate(json[0], likesCount, likeButton, 0);
    }
}