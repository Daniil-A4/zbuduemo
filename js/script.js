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

const buttons = document.querySelectorAll('.header__link')

buttons.forEach(button => button.addEventListener('click', closeMenuBurger))

function closeMenuBurger() {
  document.documentElement.classList.remove('_lock')
  iconMenu.classList.remove('_active')
  menuBody.classList.remove('_active')

}

//animate
// const text = document.querySelector('.bg-logo-item');

// const splitText = (el) => {
//   el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
//     return `<div class="word">` +
//       m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
//       `</div>`;
//   });
//   return el;
// };

// const split = splitText(text);


// Array.from(split.querySelectorAll('.letter')).forEach((el, idx) => {
//   TweenMax.fromTo(el, 0.3, {
//     opacity: 0,
//     y: '100%',
//   },
//   {
//     opacity: 1,
//     y: '-100%',
//     delay: idx * 0.05,
//     repeat: 0,
//   })
// });



const tl = new TimelineMax()

tl.to('.bg-logo-item', {
  y: "-100%",
  duration: 0.3,
  stagger: {
    each: 0.08,
    repeat: 1,
    repeatDelay: 0.8, 
    yoyo: true,
  },
});

tl.to('.bg li', {
  y: '100%',
  duration: 0.6,
  stagger: {
    each: 0.1,
    repeat: 0,
  }
})

tl.from('.hero__offer', 1, {
  x: -170,
  opacity: 0
})

tl.from('.hero__socials', 1, {
  x: 40,
  opacity: 0
}, '-=0.8')

tl.from('.hero__sub-text', 1, {
  y: 40,
  opacity: 0
}, '-=0.6')

tl.from('.hero__line', 0.7, {
  x: '-100%'
}, '-=0.8')

tl.from('.hero__line-button', 0.5, {
  y: -40,
})

tl.from('.hero__line-button-text span', 0.3, {
  y: '100%',
  opacity: 0,
})
tl.from('.header__link p', 1.5, {
  x: '-100%',
  opacity: 0,
}, '-=0.7')





// Gallery
new Swiper('.gallery-swiper', {
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
    nextEl: '.gallery-swiper .slider-arrow_next',
    prevEl: '.gallery-swiper .slider-arrow_prev',
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



// telegam
const headerForm = document.querySelector('.popup-header__form')
const quizForm = document.querySelector('.quiz-form')
const callbackForm = document.querySelector('.send-form__form')
const footerForm = document.querySelector('.footer__form')

const token = '6274279465:AAHg4JBVF8LLtnLA0JR3-veTmGXe0mIy1_M'

const chatId = -907187303
const url = "https://api.telegram.org/bot" + token + "/sendMessage"

headerForm.onsubmit = async () => {
  const name = document.querySelector(".popup-header__name").value;
  const number = document.querySelector(".popup-header__number").value;
  const { ip_address } = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=09c88766447a4f3c961fe187f23c43dd').then(r => r.json())

  const message = "ім'я: " + name + "\nномер: " + number + "\nIP: " + ip_address;

  headerForm.reset()
  popupClose(headerForm.closest('.popup'))


  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}

callbackForm.onsubmit = async () => {
  const name = document.querySelector(".send-form__name").value;
  const number = document.querySelector(".send-form__number").value;
  const { ip_address } = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=09c88766447a4f3c961fe187f23c43dd').then(r => r.json())

  const message = "ім'я: " + name + "\nномер: " + number + "\nIP: " + ip_address;

  headerForm.reset()
  popupClose(headerForm.closest('.popup'))


  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}

footerForm.onsubmit = async () => {
  const name = document.querySelector(".footer__name").value;
  const number = document.querySelector(".footer__number").value;
  const { ip_address } = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=09c88766447a4f3c961fe187f23c43dd').then(r => r.json())

  const message = "ім'я: " + name + "\nномер: " + number + "\nIP: " + ip_address;

  headerForm.reset()
  popupClose(headerForm.closest('.popup'))


  fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
      "chat_id": chatId,
      "text": message
    })
  })
}


//scroll on click
const menuLinks = document.querySelectorAll('.header__item[data-goto]')
const heroBtn = document.querySelector('.hero__btn[data-goto]')

if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })


  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + offsetTop - document.querySelector('header').offsetHeight

      window.scrollTo({
        top: gotoBlock.offsetTop,
        behavior: "smooth"
      })
      e.preventDefault()
    }
  }
}



