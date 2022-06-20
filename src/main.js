
import "./sass/main.scss";


// NAVIGATION
const nav = document.querySelector(".navigation");

const navBtns = document.querySelectorAll(".navigation__button, .navigation__link");
navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      nav.classList.toggle("navigation--active");
  });
});

// document.addEventListener("scroll", () => {
//     const el =  window;
//     if (el.scrollY > 0.05 * el.innerHeight) {
//         nav.classList.add("navigation--active");
//     }
//     else {
//         nav.classList.remove("navigation--active");
//     }
// }, {passive: true});

// FADE IN
const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("appear");
            observer.unobserve(e.target);
        }
    });
}, {
    threshold: 0,
    rootMargin: "0px 0px -64px 0px"
});

document.querySelectorAll(".fade-in")
    .forEach(el => fadeInObserver.observe(el));


