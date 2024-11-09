export function addToImgErrorListener(swiper, template, errorTemplate){

    let img = template.querySelector('img')

    if (img.addEventListener) {
        img.addEventListener('error', function () {
            this.replaceWith(errorTemplate);
            swiper.updateSlides();
        });
    }
}