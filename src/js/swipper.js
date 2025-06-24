import Swiper from 'swiper';
import 'swiper/css';

const swiperConfigs = [
  {
    selector: '.profile-swiper',
    slideClass: 'profile-swiper-slide',
    wrapperClass: 'profile-swiper-wrapper',
    paginationItemSelector: '.profile-pagination-item',
    slidesPerViewMobile: 1.2,
  },
  {
    selector: '.how-swiper',
    slideClass: 'how-swiper-slide',
    wrapperClass: 'how-swiper-wrapper',
    paginationItemSelector: '.how-pagination-item',
    slidesPerViewMobile: 1,
  },
  {
    selector: '.join-swiper',
    slideClass: 'join-swiper-slide',
    wrapperClass: 'join-swiper-wrapper',
    paginationItemSelector: '.join-pagination-item',
    slidesPerViewMobile: 1.2,
  }
];

const swiperInstances = {};

function initSwipers() {
  const screenWidth = window.innerWidth;

  swiperConfigs.forEach(config => {
    const container = document.querySelector(config.selector);
    if (!container) return;

    const id = config.selector;

    // Destroy existing swiper if exists
    if (swiperInstances[id]) {
      swiperInstances[id].destroy(true, true);
      delete swiperInstances[id];
      clearPagination(config.paginationItemSelector);
    }

    // Mobile only
    if (screenWidth < 1439) {
      const swiper = new Swiper(id, {
        slidesPerView: config.slidesPerViewMobile,
        spaceBetween: 10,
        loop: true,
        slideClass: config.slideClass,
        wrapperClass: config.wrapperClass,
        direction: 'horizontal',
        on: {
          init: function () {
            updatePagination(config.paginationItemSelector, this.realIndex);
          },
          slideChange: function () {
            updatePagination(config.paginationItemSelector, this.realIndex);
          },
        },
      });

      swiperInstances[id] = swiper;

      const paginationItems = document.querySelectorAll(config.paginationItemSelector);
      paginationItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          swiper.slideToLoop(index);
        });
      });
    }
  });
}

function updatePagination(paginationSelector, activeIndex) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach((item, index) => {
    item.classList.toggle('active', index === activeIndex);
  });
}

function clearPagination(paginationSelector) {
  const items = document.querySelectorAll(paginationSelector);
  items.forEach(item => item.classList.remove('active'));
}

document.addEventListener('DOMContentLoaded', initSwipers);
window.addEventListener('resize', initSwipers);