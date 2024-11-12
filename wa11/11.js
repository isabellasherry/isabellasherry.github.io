const gallery = document.querySelector('.gallery');
const displayImg = document.getElementById('display-img');
const images = Array.from(gallery.querySelectorAll('img'));
let currentIndex = 0;

const caption = document.createElement('p');
document.querySelector('.display').appendChild(caption);


const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.classList.add('lightbox', 'hidden');
const lightboxImg = document.createElement('img');
lightboxImg.id = 'lightbox-img';
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);


function updateDisplayImage(index) {
  displayImg.src = images[index].src;
  displayImg.alt = images[index].alt;
  caption.textContent = images[index].getAttribute('data-caption') || '';
  currentIndex = index;
}


gallery.addEventListener('click', function(event) {
  if (event.target.tagName === 'IMG') {
    const clickedIndex = images.indexOf(event.target);
    updateDisplayImage(clickedIndex);
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % images.length;
    updateDisplayImage(currentIndex);
  } else if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateDisplayImage(currentIndex);
  }
});

displayImg.addEventListener('click', () => {
  lightboxImg.src = displayImg.src;
  lightbox.classList.remove('hidden');
});

lightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});
