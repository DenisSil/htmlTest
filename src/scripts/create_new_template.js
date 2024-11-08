function createNewTemplate(slideData, slideTemplate){
    let newTemplate = slideTemplate.cloneNode(true);
    let img = newTemplate.querySelector('img');
    let title = newTemplate.querySelector('.slide-title').querySelector('h1');
    img.src = `${slideData.url}`;
    title.innerText = `${slideData.title}`;

    return newTemplate;
}