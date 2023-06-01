

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
          items:1.3,          
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





// light mode Button

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