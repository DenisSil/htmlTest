export function updateSlideTitle(swiper, currentIndex, prevIndex) {

    let slides = swiper.slides;

    let currentSlide = slides[currentIndex];
    let prevSlide = slides[prevIndex];

    prevSlide.querySelector(".slide-title").classList.add("hide");
    currentSlide.querySelector(".slide-title").classList.remove("hide");
}