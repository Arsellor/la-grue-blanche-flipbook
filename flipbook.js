'use strict';

const bookElement = document.querySelector('#flipbook');
const counter = document.querySelector('#counter');
const prevButton = document.querySelector('#prevBtn');
const nextButton = document.querySelector('#nextBtn');
const pages = [...document.querySelectorAll('.page')];

if (!bookElement || !window.St?.PageFlip) {
  console.error('Le moteur PageFlip n’a pas pu être initialisé.');
} else {
  const pageFlip = new St.PageFlip(bookElement, {
    width: 430,
    height: 660,
    size: 'stretch',
    minWidth: 260,
    maxWidth: 430,
    minHeight: 400,
    maxHeight: 660,
    showCover: true,
    usePortrait: true,
    drawShadow: true,
    maxShadowOpacity: 0.48,
    flippingTime: 720,
    mobileScrollSupport: false,
    clickEventForward: true,
    startZIndex: 0
  });

  pageFlip.loadFromHTML(pages);

  const updateUI = () => {
    const page = Math.min(pageFlip.getCurrentPageIndex() + 1, pages.length);
    counter.value = `${page} / ${pages.length}`;
    counter.textContent = `${page} / ${pages.length}`;
    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= pages.length;
  };

  prevButton.addEventListener('click', () => pageFlip.flipPrev());
  nextButton.addEventListener('click', () => pageFlip.flipNext());
  pageFlip.on('flip', updateUI);
  pageFlip.on('init', updateUI);

  document.addEventListener('keydown', (event) => {
    const tag = document.activeElement?.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT', 'AUDIO'].includes(tag)) return;
    if (event.key === 'ArrowLeft') pageFlip.flipPrev();
    if (event.key === 'ArrowRight') pageFlip.flipNext();
  });

  window.addEventListener('resize', () => pageFlip.update());
}
