import { galleryItems } from './gallery-items.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

import '../css/01-gallery.css';

import SimpleLightbox from 'simplelightbox';

const palettContainer = document.querySelector('.gallery');
const cardsImg = createGalleryImgMarkup(galleryItems);

palettContainer.insertAdjacentHTML('beforeend', cardsImg);
palettContainer.addEventListener('click', onPalettContainerClick);

function createGalleryImgMarkup(gallery) {
  return gallery
    .map(({ description, original, preview }) => {
      return `
      
<div class="gallery gallery__item">
    <a href="${original}" class="gallery__link">
    <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"  />
    </a>
</div>
 `;
    })
    .join('');
}

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {});
function onPalettContainerClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      gallery.close();
    }
  });
}
