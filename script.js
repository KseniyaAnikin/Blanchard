const params = {
  btnClassName: "header__stylebtn",
  dropClassName: "header__dropdown",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
}

setMenuListener();

const element = document.querySelector('.gallery__select');
const choices = new Choices (element,{
    searchEnabled: false,
    itemSelectText: "",
    classNames: {
      focusState: 'is-focused'
    },
});

// Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  allowTouchMove: false,
  effect: 'fade',
  speed: 5000,
  autoplay: {
      delay: 4000
    }
});

// document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {
    
    pagination: {
      el: ".gallery__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__btn--next",
      prevEl: ".gallery__btn--prev"
    },

    breakpoints: {
      300: {
        slidesPerView: 1, 
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      
      441: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },

      1240: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,  
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });
// });

new Accordion ('.accordion', {
  elementClass: 'catalog__item',
  triggerClass: 'catalog__link',
  panelClass: 'catalog__text',
  });

// Tabs
let tbsBtn = document.querySelectorAll('.innerlist__btn')
let tbsItem = document.querySelectorAll('.catalog__about')

tbsBtn.forEach(function(element){
element.addEventListener('click', function(e){
  const path= e.currentTarget.dataset.path;
  tbsBtn.forEach(function(btn){
    btn.classList.remove('innerlist__btn--active')
  });
  e.currentTarget.classList.add('innerlist__btn--active');
  tbsItem.forEach(function(element){
    element.classList.remove('catalog__about--active')
  });
  document.querySelector(`[data-target= "${path}"]`).classList.add('catalog__about--active')
});
});

//  каталог swiper

let eventsSlider = new Swiper(".events-swiper__slides-container", {

  navigation: {
    nextEl: ".events-swiper__btn--next",
    prevEl: ".events-swiper__btn--prev"
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1, 
      slidesPerGroup: 1,
      spaceBetween: 10,
    },

    580: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  },

});

// partners swiper

const partnersSlider = document.querySelector('.partners__swiper-container');

var partnersSwiper = new Swiper(partnersSlider, {
  slideClass: ('partners__swiper-slide'),
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 30,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints:{

    668: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },

    1600:{
      spaceBetween: 50,
      slidesPerView: 3,
      slidesPerGroup: 1,
    }
  }
});


// map
ymaps.ready(init);
    function init(){

        var myMap = new ymaps.Map("map", {
            center: [55.75846806898367, 37.60108849999989],
            zoom: 14,
            controls: ['geolocationControl', 'zoomControl'],
        },
        {
          suppressMapOpenBlock: true,
          geolocationControlSize: "large",
          geolocationControlFloat: 'none',
          geolocationControlPosition:  { top: "359px", right: "16px" },
          zoomControlSize: "small",
          zoomControlFloat: "none",
          zoomControlPosition: { top: "268px", right: "16px" }
        });
        

    
        myMap.behaviors.disable('scrollZoom');

        var myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/mappoint.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [-15, -44]
        });

        myMap.geoObjects.add(myPlacemark); 
    }

// Burger-menu
let burger = document.querySelector('.header__burgmenu');
let menu = document.querySelector('.header__navigation');
let link = menu.querySelectorAll('.header__item');
let closeBurger = menu.querySelector('.header__burgmenuclose');


burger.addEventListener('click', function(){
menu.classList.add('header__navigation--active');
menu.classList.remove('header__navigation--disactive');
document.body.classList.toggle('stop-scroll');
});


link.forEach(function(el){
el.addEventListener('click', function(){
  menu.classList.remove('header__navigation--active');
  document.body.classList.remove('stop-scroll');
});

closeBurger.addEventListener('click', function(){
  menu.classList.add('header__navigation--disactive');
  document.body.classList.remove('stop-scroll');
});
})  

let search = document.querySelector('.header__button-search');
let searchForm = document.querySelector('.header__form');
let closeSearch  = searchForm.querySelector('.header-form__closebtn');

search.addEventListener('click', function(){
searchForm.classList.remove('header__form--disactive');
searchForm.classList.add('header__form--active');
});

closeSearch.addEventListener('click',function(e){
  e.preventDefault();
searchForm.classList.remove('header__form--active');
searchForm.classList.add('header__form--disactive');
});

// TelMask
var selector = document.querySelector("input[type='tel']");

var im = new Inputmask("+7(999)999-99-99");
im.mask(selector); 

const validation = new JustValidate('.application__form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Вы не ввели имя',
    },
    {
      rule: 'customRegexp',
      value:  /^[A-ZА-ЯЁ]+$/i,
      errorMessage: 'Недопустимый формат',
    },
  ])
  
  .addField('#phone', [
    {
    validator: function(name, value) {
    const phone = selector.inputmask.unmaskedvalue()
    return Number(phone) && phone.length === 10
    },
    errorMessage: 'Недопустимый формат',
    }
    ])

// Модальное окно
document.querySelectorAll('.js-open-modal').forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(event) {
    const path = event.currentTarget.dataset.path


    document.querySelectorAll('.modal').forEach(function(btn) {
      btn.classList.remove('modal_active')
    })

    document.querySelector(`[data-target="${path}"]`).classList.add('modal_active');
    document.body.style.overflow = 'hidden';
    window.addEventListener('click', e => { // при клике в любом месте окна браузера
      const target = e.target // находим элемент, на котором был клик
      if (!target.closest('.modal__img') && !target.closest('.modal__text') && !target.closest('.js-open-modal')) { // если этот элемент или его родительские элементы не кнопка
        document.querySelectorAll('.modal').forEach(function(btn) {
          btn.classList.remove('modal_active');
          document.body.removeAttribute('style');
        }) // то закрываем окно навигации, удаляя активный класс
      }
    })
  });
});    

// scroll
(() => {

  function scrollToContent (link, isMobile) {
    if (isMobile && window.getWindowWidth() > window.MOBILE_WIDTH) {
      return;
    }

    const href = link.getAttribute('href').substring(1);

    if (Boolean(href)) {
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
    }

  }

  document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        scrollToContent(this, false);
    });
  });
}) ();

// tippy

tippy('#myTool1', {
  content: "Пример современных тенденций современная методология разработки",
  trigger: 'click',
  trigger: 'focus',
  theme: 'tooltip-theme',
  animation: 'fade',
});

tippy('#myTool2', {
  content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводывызывают у вас эмоции",
  trigger: 'click',
  trigger: 'focus',
  theme: 'tooltip-theme',
  animation: 'fade',
});

tippy('#myTool3', {
  content: "В стремлении повысить качество",
  trigger: 'click',
  trigger: 'focus',
  theme: 'tooltip-theme',
  animation: 'fade',
});




