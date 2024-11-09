import { addToImgErrorListener } from './add_error_listener.js';
import { createNewTemplate } from './create_new_template.js';

export function createTemplateAndAppendInSwiper(json, swiper, slideTemplate, errorTemplate) {
    for (let i of json) {
        let newTemplate = createNewTemplate(i, slideTemplate);
        let newErrorTemplate = errorTemplate.cloneNode(true);
        addToImgErrorListener(swiper, newTemplate, newErrorTemplate);
        swiper.appendSlide(newTemplate);
    }
}