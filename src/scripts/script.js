
"use strict";

import { updateSlideLikeCount } from './update_slide_like_count.js';
import { disableLikeButton } from "./disable_like_button.js";
import { getSlides } from './get_slides.js';
import { slidesUpdate } from './slides_update.js';
import { createTemplateAndAppendInSwiper } from './create_template_and_append_in_swiper.js';

let template = document.querySelector('#swiper-swipe-template').content;
let errorTemplate = document.querySelector('#error-template').content;

let slideData = [];
let likesCount = document.querySelector(".likes-count");
let likeButton = document.querySelector(".like-button");
let popup = document.querySelector(".popup");
let closePopupButton = popup.querySelector(".popup__close");
let slideDescription = document.querySelector(".slide-description");
let slideDescriptionP = slideDescription.querySelector("p");
let activePopup = popup.querySelector(".popup__body");
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
    let currentSlide = slideData[swiper.activeIndex];

    let newLikeCount = updateSlideLikeCount(currentSlide);
    console.log(newLikeCount);
    likesCount.innerText = newLikeCount;
    localStorage.setItem(currentSlide.id, true);
    disableLikeButton(currentSlide.id, likeButton);

    popup.classList.add("open");

});

activePopup.addEventListener('click', () => {
    popup.classList.remove("open");
});

closePopupButton.addEventListener('click', () => {
    popup.classList.remove("open");
});

swiper.on("activeIndexChange", function () {

    let currentIndex = swiper.activeIndex;
    if (currentIndex + 1 === slidesCount) {
        getSlidesAndUpdateSwiper(swiper);
    }

    let currentSlide = slideData[currentIndex];
    slidesUpdate(swiper, currentSlide, likesCount, likeButton, prevIndex, slideDescriptionP);

    prevIndex = currentIndex;
});



async function getSlidesAndUpdateSwiper(swiper) {
    
    let slidesData = await getSlides(slidesCount, 3);
    slidesCount += 3;

    slideData.push(...slidesData);
    createTemplateAndAppendInSwiper(slidesData, swiper, template, errorTemplate);

    if (slidesCount < 4) {
         slidesUpdate(swiper, slidesData[0], likesCount, likeButton, prevIndex, slideDescriptionP);
    }
};

getSlidesAndUpdateSwiper(swiper);