// light theme
function themeToggle() {
	document.getElementById("html").classList.toggle("_light");
}

// open menu from burger
function navToggle() {
  var headerUl = document.getElementById("headerUl");
  headerUl.classList.toggle("active");
  document.getElementById("html").classList.toggle("overflow-hidden");
  document.getElementById("body").classList.toggle("overflow-hidden");
}
function removeOverflow() { 
  var headerUl = document.getElementById("headerUl");
  headerUl.classList.remove("active"); 
  document.getElementById("html").classList.remove("overflow-hidden");
  document.getElementById("body").classList.remove("overflow-hidden");
}

// copyright
var currentYear = new Date().getFullYear();
document.getElementById("footer-year").innerHTML = currentYear;

// carousel reflections section
$('.owl-carousel').owlCarousel({    
    lazyLoad:true,
    loop:true,
    margin:18,
    autoHeight: true,
    nav: true,      
    responsive : {
      // breakpoint from 0 up
      0 : {
          items:1,          
      },      
      576 : {
          items:2,                 
      },
      // breakpoint from 992 up      
      992: {
        items:3,        
      }
    }
});


// light theme Button

let isChecked = false;

function onBtnUp() {
  isChecked = !isChecked;

  let x = 0;
  let backgroundColor = "#827D96";
  let size = "100px";

  if (isChecked) {
    x = 38;
    backgroundColor = "#FFFFFF";
    size = "100px";
  }

  let tl = gsap.timeline();
  tl.to(".knob", { x, duration: 1 }, "up");
  tl.to(".top", { backgroundColor, duration: 1 }, "up");
  tl.to(".light", { width: size, height: size, duration: 1 }, "up");
}

const btn = document.getElementById("btn");
btn.addEventListener("mouseup", onBtnUp);