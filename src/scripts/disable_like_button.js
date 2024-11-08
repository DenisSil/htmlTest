function disableLikeButton(currentSlideId, button) {
    let isLiked = localStorage.getItem(currentSlideId);

    if (isLiked) {
        button.setAttribute("disabled", '');
    } else {
        button.removeAttribute("disabled", '');
    }
};