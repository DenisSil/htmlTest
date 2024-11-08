async function updateSlideLikeCount(currentSlide){
    currentSlide.likes += 1;
    let res = fetch(`http://localhost:3000/slides/${currentSlide.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currentSlide),
    });

    if(res.ok){
        return currentSlide.likesCount;
    }
}