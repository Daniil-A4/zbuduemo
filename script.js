//popup
const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('.body')
const lockPadding = document.querySelectorAll('.lock-padding')
const wrapper = document.querySelector('.wrapper')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup')

if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')
    if (popupActive) {
      popupClose(popupActive, false)
    } /* else {
			bodyLock()
		} */
    curentPopup.classList.add('open')
    wrapper.classList.add('_lock')
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    wrapper.classList.remove('_lock')
    popupActive.classList.remove('open');
    /* if (doUnlock) {
      bodyUnLock()
    } */
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive)
  }
})



//menu-burger
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.header__nav')
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.documentElement.classList.toggle('_lock')
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
}

const buttons = document.querySelectorAll('.nav__item')

buttons.forEach(button => button.addEventListener('click', closeMenuBurger))

function closeMenuBurger() {
  document.documentElement.classList.remove('_lock')
  iconMenu.classList.remove('_active')
  menuBody.classList.remove('_active')
  
}


const tl = new TimelineMax()

tl.from('.header__item', 2, {
  x: '-100%',
  opacity: 0
})

tl.from('.hero__offer', 1, {
  x: -170,
  opacity: 0
}, '-=0.8')
tl.from('.hero__socials', 1, {
  x: 40,
  opacity: 0
}, '-=0.8')

tl.from('.hero__sub-text', 1, {
  y: 40,
  opacity:0
}, '-=0.6')

tl.from('.hero__line', 0.7, {
  x: '-100%'
},'-=0.8')

tl.from('.hero__line-button', 0.5, {
  y: -40,
})

tl.from('.hero__line-button-text', 0.3, {
  y: '100%',
  opacity: 0,
})

// Gallery
new Swiper('.swiper-container', {
  observer: true,
  observerParents: true,
  slidesPerView: 3.5,
  spaceBetween: 20,
  speed: 800,
  // loop: true,
  centeredSlides: false,
  watchOverflow: true,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  navigation: {
    nextEl: '.swiper-container .slider-arrow_next',
    prevEl: '.swiper-container .slider-arrow_prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
    },
    500: {
      slidesPerView: 1.8,
    },
    767: {
      slidesPerView: 2.5,
    },
    991: {
      slidesPerView: 3.5,
    },
  }

});