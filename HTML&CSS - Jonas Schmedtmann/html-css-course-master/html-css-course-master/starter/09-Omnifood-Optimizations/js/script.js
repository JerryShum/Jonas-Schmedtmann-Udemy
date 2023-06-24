
// const myName = "Jerry"
// const h1 = document.querySelector('.heading-primary');

// console.log("hello world");
// console.log(h1);

// h1.textContent = myName;

///////////////////////////////////////////////////
//* Setting current year to the footer

const yearEl = document.querySelector('.year');
const presentYear = new Date().getFullYear();

yearEl.textContent = presentYear;

////////////////////////////////////////////////////
//* Making mobile navigation work
'nav-open'

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
})

////////////////////////////////////////////////////////
//* Smooth Scrolling animation

const allLinks = document.querySelectorAll('a:link');
console.log(allLinks);


allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    //Scroll back to top (omnifood icons)
    if (href === '#') window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    //Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const selectionEl = document.querySelector(href);
      console.log(href);

      selectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    //Close mobile nav
    if (link.classList.contains('main-nav-link')) {
      headerEl.classList.toggle('nav-open');
    }

  })
});

////////////////////////////////////////////////////////
//* Sticky Navigation

const heroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(function (entries) {
  //? Function
  const ent = entries[0];
  if (ent.isIntersecting === false) {
    console.log(ent);
    document.body.classList.add('sticky');
  }

  //Remove
  if (ent.isIntersecting) {
    document.body.classList.remove('sticky');
  }
},
  {
    //? The options of the object
    //Root null means when the object is in the viewport
    root: null,
    //Threshold means the function will work when 0% of the object is in the viewport -> 1 means 100% and 0 means 0%
    threshold: 0,

    rootMargin: '-80px',
  });
obs.observe(heroEl);


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
