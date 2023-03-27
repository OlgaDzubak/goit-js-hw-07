import { galleryItems } from './gallery-items.js';

//------------------------------------------------------------------------------------------
//1.Створення і рендер розмітки на підставі масиву даних galleryItems
const ulGallery = document.querySelector("ul.gallery");                                       // знаходемо посилання на список ul.gallery в 01-gallery.html
function createGalleryItemsHTMLStr(items) {                                                   // пишемо функцію для формування рядка з html кодом, який будемо додавати в html файл

    const galleryItemsHtmlString = items.map(({preview, original, description}) => {
        return `
        <li class="gallery__item"> 
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
            </a>
        </li>`;
    }).join("");
    
    return galleryItemsHtmlString;
}
ulGallery.insertAdjacentHTML('afterbegin', createGalleryItemsHTMLStr(galleryItems));          //  додаємо рядок з html кодом, який повертає функція createGalleryItemsHTMLStr, до списку ul.gallery

//2.Ініціалізація екземпляра SimpleLightbox для галереї ul.gallery
var lightbox = new SimpleLightbox('ul.gallery a', {captionsData: 'alt', captionDelay: 250});  // caption беремо з атрибуту "alt", та додаємо затримку показу назви в 300 мілісекунд. За замовченням caption показується внизу під картинкою
