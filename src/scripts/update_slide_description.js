export async function updateSlideDescription(currentSlide, slideDescription) {

    slideDescription.classList.add("hide");
    
    await setTimeout(() => {
        slideDescription.innerText = currentSlide.description;
    }, "1000");

    await setTimeout(() => {
        slideDescription.classList.remove("hide");
    }, "1000");
}