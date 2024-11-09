export function updateSlideLikeCount(currentSlide){

    currentSlide.likes += 1;

    fetch(`http://localhost:3000/slides/${currentSlide.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currentSlide),
    });

    return currentSlide.likes;
}