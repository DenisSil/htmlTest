import { disableLikeButton } from 'disable_like_button.js';
import { updateSlideDescription } from 'update_slide_description.js';
import { updateSlideTitle } from 'update_slide_title.js';


function slidesUpdate(currentSlide, likeText, likeButton, prevIndex, slideDescription) {
    likeText.innerText = currentSlide.likes;
    disableLikeButton(currentSlide.id, likeButton);
    updateSlideTitle(prevIndex);
    updateSlideDescription(currentSlide, slideDescription);
}
