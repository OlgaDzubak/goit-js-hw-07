import { galleryItems } from './gallery-items.js';


//------------------------------------------------------------------------------------------
//1.Створення і рендер розмітки на підставі масиву даних galleryItems
const ulGallery = document.querySelector("ul.gallery");                              // знаходемо посилання на список ul.gallery в 01-gallery.html

function createGalleryItemsHTMLStr(items) {                                          // пишемо функцію для формування рядка з html кодом, який будемо додавати в html файл
    const galleryItemsHtmlString = items.map(({preview, original, description}) => {
        return `
        <li class="gallery__item js_target" rel="noopener noreferrer nofollow"> 
            <a class="gallery__link js_target" href="${original}">
                <img
                    class="gallery__image js_target"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    }).join("");
    return galleryItemsHtmlString;
}
ulGallery.insertAdjacentHTML('afterbegin', createGalleryItemsHTMLStr(galleryItems)); //  додаємо рядок з html кодом, який повертає функція createGalleryItemsHTMLStr, до списку ul.gallery



//------------------------------------------------------------------------------------------
//2.Реалізація делегування на ul.gallery і отримання url великого зображення
let instance;                                                                       // В змінній instance будемо зберігати створений basicLightbox

ulGallery.addEventListener('click', showModalWindow);                               // Додаємо слухача кліка на список ul.gallery, при кліку буде виконуватися функція showModalWindow
function showModalWindow(event) {                                                   // Функція відкриває модальне вікно з великим зображенням картинки, яка була обрана кліком в галлереї ul.gallery
    event.preventDefault();                                                         // Забороняємо поведінку браузера за замовчуванням при натисканні посилання
    if (!event.target.classList.contains('js_target')) {
        return;
    }
    instance = basicLightbox.create(`
        <div class="modal">
            <img src="${event.target.dataset.source}" width="1100">
        </div>
    `);
    instance.show();                                                                // Показуємо модальне вікно
    document.addEventListener('keydown',closeModalWindow);                          // Після відкриття модального вікна вішаємо на документ слухача клавіатури (будемо ловити натикання на клавішу "Escape")
}
function closeModalWindow(event){                                                   // Функція для обробки слухача клавіатури (закриває модальне вікно і видаляємо слухача клавіатури тільки якщо натиснута клавіша "Escape")
    if (event.key !== "Escape") {
        return;
    }
    instance.close(); 
    document.removeEventListener('keydown',closeModalWindow);
}