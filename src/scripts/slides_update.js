import { disableLikeButton } from './disable_like_button.js';
import { updateSlideDescription } from './update_slide_description.js';
import { updateSlideTitle } from './update_slide_title.js';


export function slidesUpdate(swiper, currentSlide, likeText, likeButton, prevIndex, slideDescription) {
    likeText.innerText = currentSlide.likes;
    disableLikeButton(currentSlide.id, likeButton);
    updateSlideTitle(swiper, swiper.activeIndex, prevIndex);
    updateSlideDescription(currentSlide, slideDescription);
}
