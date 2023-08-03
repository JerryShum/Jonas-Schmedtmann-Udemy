'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

//? Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
// The button we use to start scrolling
const section1 = document.querySelector('#section--1');
// The section we want to scroll to

btnScrollTo.addEventListener('click', function (event) {
  const s1coords = section1.getBoundingClientRect();
  // this gives us a DOM rectangle 
  // the measurements are relative to the current viewport
  console.log('Section 1', s1coords);

  console.log("event.target (btnscrollto)", event.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log("height/width Viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //! Scrolling

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //Old school way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //New way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////

//? Event Delegation: Implementing Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (event) {
//     event.preventDefault();
//     // this prevents the behaviour of the anchors (href="section--2" -> auto scrolls to that element wiht that id when clicked)

//     const id = this.getAttribute('href');
//     console.log(id);
//     // this looks like a selector -> we get the element -> scrollintoview

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })

//Put id of the element you want to scroll to in the anchor (href) -> use js to scroll to that element

//! This is somewhat inefficient as these 3 elements have the same function attached to them (really inefficient if there are 1000+ with the same)

//! Using Event Delegation:
// we set the event we want triggered on a parent element -> when target element is clicked, it bubbles up and triggers the event in the parent element which will scroll to desired section

// 1. Add event listener to common parent element
// 2. Determine what element where the event originated (event.target)

document.querySelector('.nav__links').addEventListener('click', function (event) {
  event.preventDefault();
  console.log(event.target);

  // Matching Strategy (to check whether the thing you click is matches what you want -> in this case a nav__link and not anywhere else)
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

///////////////////////////////////////

//? Building a Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Using event delegation for the tabs

tabsContainer.addEventListener('click', function (event) {
  // Matching Strategy
  const clicked = event.target.closest('.operations__tab');
  // we use closest() because whenevr we click on either the button or the span element inside the button, we are forsaking the other
  // closest allows us to click either and still select the operatons__tab (tab element button)
  console.log(clicked);

  //! Guard Clause
  if (!clicked) return;
  // we get a null value if we still click on the container but not any of the buttons (closest returns null b/c there are no parents with the '.operation__tab' class) -> if we receieve a null value, exit this function

  //! Active Tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');


  //! Activate content area
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

////////////////////////////////////////////////////

//? Menu Fade Animation

const nav = document.querySelector('.nav');

//! Making code more clean using a function:
const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    console.log(event.target);

    // selecting sibling -> go to parent -> children
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      if (element !== link) {
        element.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

// we can use event delegation again
// mouseover event can bubble, thats why we use it (instead of mouse enter / mouseleave)

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//! The bind method creates a copy of the function that it is CALLED on and the sets the .this keyword to whatever we pass into bind (0.5) (1) 
// this works b/c bind RETURNS A NEW FUNCTION (the entire thing acts like a new function with multiple parameters)
// It doesn't work normally b/c you cant call a function with parameters and can only pass by reference
// .this -> opacity 

////////////////////////////////////////////////////

//? Sticky Navigation

//! We don't use this b/c of performance issues
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function (event) {
  // Fires every time we scroll in the window (should usually be avoided)
  console.log(window.scrollY);
  // The distance form top of viewport (viewable top) to the actual top of the page

  //! We should add sticky class when we have the first section scrolled
  if (this.window.scrollY > initialCoords.top) {
    // add the sticky class when our scroll position is greater than section1's distance to the top (meaning we have scroll further than that)
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

//! Using the Intersection Observer API
/*
const observerCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
};
// the observer object itself will be passed into the callbackfunction, ENTRIES are the array of thresholds

const observerOptions = {
  root: null,
  // Needs a root property -> the element which the target is intersecting (section 1 is the target) -> null means entire viewport -> when our target intersects the viewport
  threshold: [0, 0.2],
  // percentage of intersection when the callback function is called, can be an array
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
// we must create a object which takes in a callback function and an options object

observer.observe(section1);
// we use this object to "observe" an element
*/

//! We want nav to be sticky when the header is out of view
// basically when the header is no longer on the screen, it is "intersecting" -> passes the threshold 

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);


const stickyNav = function (entries) {
  const [entry] = entries;
  // destructuring the first value of the entries array(what we see on our console)
  // console.log(entry);

  // we want to add the sticky class when the header is NOT on the screen (isIntersecting = false)
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // root margin is a box of pixels/space that is applied outisde of our target -> neg. margin means that there is space TAKEN AWAY -> occurs 1 value of nav.height earlier (90px when full screen)
});
headerObserver.observe(header);

////////////////////////////////////////////////////

//? Revealing elements on scroll

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // inside of the entry, there is a target with associated properties

  // Section1 is intersecting at the start of loading -> BUT the isIntersecting property is false -> false false -> true -> return out of function
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  // We keep getting entries after we scroll past -> we dont like this due to performance -> unobserve the specific target after accomplishing our goal
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

////////////////////////////////////////////////////

//? Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
// We are selecting all the images with the property of data-src (similar to css)

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // the entry.target is the element that is currently being intersected

  //! Load event
  // Load event occurs once the images are switched
  // we can use this to know when to remove the lazy class
  entry.target.addEventListener('load', function () {

    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////

//? Slider Component
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

//! Putting all slides side-by-side
slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * index}%)`);

//! Function for buttons
const goToSlide = function (curSlide) {
  slides.forEach((s, index) => s.style.transform = `translateX(${100 * (index - curSlide)}%)`);
  //currentSlide = 1: -100%, 0%, 100%, 200%
}

goToSlide(0);
// We do this b/c we want to start at the first slide (index 0)

//! Next Slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
    // Basically if we click the button on the last slide, it will loop back to the first one by setting the index back to 0
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
}

//! Previous Slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide === maxSlide - 1;
    // Loop backwards to the last element of the array
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
}

//! Button functionality
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

//! HANDLING KEYBOARD EVENTS
document.addEventListener('keydown', function (event) {
  console.log(event.key);

  if (event.key === 'ArrowLeft') prevSlide();
  event.key === 'ArrowRight' && nextSlide();
  // using short circuiting
});

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
/*

//? Selecting, Creating, and Deleting Elements

const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// This selector returns an 'HTML COLLECTION' (automatically updates when an element is deleted in real time)

document.getElementsByClassName('btn');
// HTML collection of all elements with associated class name

//! Creating and Inserting Elements

//.insertAdjacentHTML -> bankist app -> inserting movements

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message); //Inserts message element into the header parent -> prepend = beginning
header.append(message); //Append = last element
// header.append(message.cloneNode(true)); clones the element


// header.before(message); inserts element before and after the header
// header.after(message);

//! Deleting Elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());
// removes the message element whenever it is clicked

//! Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// These styles are set as INLINE STYLES (that we set ourselves)

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
// We use this to programmatically get the style of an element

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// getComputedStyle returns a string so we must parse the number from it and add it -> +'px' converts it back into a string

//! Root Styles
// root styles is equivalent to the document element
// must use setProperty to change

document.documentElement.style.setProperty('--color-primary', 'orangered')
//! Attributes
// in an HTML element, class, id, src, alt are ALL ATTRIBUTES

const logo = document.querySelector('.nav--logo');
// Standard
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// setting attributes
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

// Non-Standard
// if it isn't a standard property it won't be readable (normally)
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

const link = documnet.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//! Data Attributes
// these attributes are always stored in the dataset modifier
console.log(logo.dataset.versionNumber);

//! Classes
logo.classList.add('')
logo.classList.remove()
logo.classList.toggle()
logo.classList.contains()

// Dont Use:
logo.className = jonas;
// overrides all classes

*/


//? Types of Events and Event Handlers
/*
const alertH1 = function (event) {
  // similar to hover as it triggers when it enters the element

  alert('addEventListener: Great! You are reading the heading!');

  h1.removeEventListener('mouseenter', alertH1)
};

const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', alertH1);

//! Removing an event handler
// must export the function (alertH1)

// remove the event handler within the function -> triggers only once

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// after 3 seconds remove the event
*/

//? Event Propagation: Bubbling and capturing
// when an event is triggered, there are 3 phases: CAPTURING, TARGET, BUBBLING

// Event starts out at the root of the DOM tree (document element) -> moves all the way down to the target event (passing through parent and parent until it finds the proper event)
// Target phase is when it finds the target element and means that events can be handled right at the target (event listeners will run when it finds the target)
// After the target phase, the event is bubbling back up to the root element (passing through all the parent elements) -> this means that it is like the event happened to all the parent elements as well (in order)

// Meaning if you have a click event triggered on the target element and also some parent elements -> those will trigger as well

//? Event Propagation: In practice

// rgb(255,255,255)
/*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(randomInt(0, 255))}, ${randomInt(randomInt(0, 255))}, ${randomInt(randomInt(0, 255))} )`;

document.querySelector('.nav__link').addEventListener('click', function (event) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', event.target);
});
*/
//! Remember that in an event handler, this. keyword will always point to the element to which it is within
/*
document.querySelector('.nav__links').addEventListener('click', function (event) {
  this.style.backgroundColor = randomColor();
  console.log('Container', event.target);
});
document.querySelector('.nav').addEventListener('click', function (event) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', event.target);
});
*/
//This triggers all parent elements of ".nav__link" to also change BG colours because of bubbling since they all have the same eventListener as .nav__link -> when it is clicked -> bubbles up -> triggers all parents with same event listener

// event.target is where the click was first handled -> all the same when bubbling b/c it is the origin of the event

// event.currentTarget === this. -> means that it is what is currently being triggered by the eventListener

// STOP.PROPAGATION -> stops bubbling to the parents

//! For the event capturing phase -> we set third parameter to true in an event listener (event capture) to reverse event bubbling -> when an event is clicked, all parent elements will trigger BEFORE the target Element


//? DOM Traversing
/*
const h1 = document.querySelector('h1');

//! Going downwards: Child
console.log(h1.querySelectorAll('.highlight'));
// Direct Children
console.log(h1.childNodes);
console.log(h1.children);
// first and last children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';


//! Going Upwards: Parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
// closest method selects the "closest" parent with that class and returns it

// if the string inside closest is itself (h1) it will select itself

//! Going Sideways: siblings

// Elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// Nodes (can be anything)
console.log(h1.previousSibling);
console.log(h1.nextSibling);

//Working with all the siblings:
// finds the parent of h1 and then lists all children (siblings of h1)
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (element) {
  if (element !== h1) {
    element.style.transform = 'scale(0.5)';
  }
});
*/