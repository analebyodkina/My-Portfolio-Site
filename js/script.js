

// carousel reflections section
$('.owl-carousel').owlCarousel({    
    lazyLoad:true,
    loop:true,
    margin:24,
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
      768 : {
        items:2.5,        
      }
    }
});


// Force a hover to see the effect
const share = document.querySelector('.share');

setTimeout(() => {
  share.classList.add("hover");
}, 1000);

setTimeout(() => {
  share.classList.remove("hover");
}, 3000);
