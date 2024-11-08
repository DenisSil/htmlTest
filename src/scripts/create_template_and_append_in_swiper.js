import { addToImgErrorListener } from 'add_error_listener.js';
import { createNewTemplate } from 'create_new_template.js';

function createTemplateAndAppendInSwiper(json, swiper, slideTemplate, errorTemplate) {
    for (let i of json) {
        let newTemplate = createNewTemplate(i, slideTemplate);
        let newErrorTemplate = errorTemplate.cloneNode(true);
        addToImgErrorListener(swiper, newTemplate, newErrorTemplate);
        swiper.appendSlide(newTemplate);
    }
    // if (slidesCount < 4) {
    //     slidesUpdate(json[0], likeCount, likeButton, 0, slideDescriptionP);
    // }
}