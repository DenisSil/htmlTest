function updateSlideTitle(swiper, prevIndex) {

    let slides = swiper.slides;
    let currentIndex = swiper.activeIndex;

    let currentSlide = slides[currentIndex];
    let prevSlide = slides[prevIndex];

    prevSlide.querySelector(".slide-title").classList.add("hide");
    currentSlide.querySelector(".slide-title").classList.remove("hide");
}