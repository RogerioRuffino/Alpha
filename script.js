const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const submenu = document.querySelector('.submenu');

const callContato = document.getElementById('contato');
callContato.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = 'Contato/index.html';
});

const callLogin = document.getElementById('login');
callLogin.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = 'Login/index.html';
});

const callSignup = document.getElementById('signup');
callSignup.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = 'Signup/index.html';
});

const callPtax = document.getElementById('ptax');
callPtax.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = 'BC/index.html';
});




/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        
        // adds the menu (hamburger) icon 
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        
        // adds the close (x) icon 
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}
/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);

// =========================================================================

const items = document.querySelectorAll(".item");
/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}
/* Event Listeners */
for (let item of items) {
    if (item.querySelector(".submenu")) {
      item.addEventListener("click", toggleItem, false);
      item.addEventListener("keypress", toggleItem, false);
    }   
}
/* Close Submenu From Anywhere */
function closeSubmenu(e) {
    if (menu.querySelector(".submenu-active")) {
      let isClickInside = menu
        .querySelector(".submenu-active")
        .contains(e.target);
      if (!isClickInside && menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
      }
      
  }}
  /* Event listener */
  document.addEventListener("click", closeSubmenu, false);

  /*========================================================================*/

   const subitems = document.querySelectorAll(".subitem");
/*Activate Submenu */
 function toggleSubItem() {
   if (this.classList.contains("subsubmenu-active")) {
     this.classList.remove("subsubmenu-active");
   } else if (submenu.querySelector(".subsubmenu-active")) {
     submenu.querySelector(".subsubmenu-active").classList.remove("subsubmenu-active");
     this.classList.add("subsubmenu-active");
   } else {
     this.classList.add("subsubmenu-active");
   }
 }
/* Event Listeners */
 for (let subitem of subitems) {
     if (subitem.querySelector(".subsubmenu")) {
       subitem.addEventListener("click", toggleSubItem, false);
       subitem.addEventListener("keypress", toggleSubItem, false);
     }   
 }

   function closeSubsubmenu(e) {
     if (submenu.querySelector(".subsubmenu-active")) {
       let isClickInside = submenu
   if (submenu.querySelector(".subsubmenu-active")) {
    
     if (!isClickInside && submenu.querySelector(".subsubmenu-active")) {
       submenu.querySelector(".subsubmenu-active").classList.remove("subsubmenu-active");
 }}}}
  // document.addEventListener("click", closeSubsubmenu, false);

  //    const hasSubSubmenu = document.querySelectorAll('.has-subsubmenu');

  //  hasSubSubmenu.forEach(submenu => {
  //    submenu.addEventListener('click', () => {
  //      submenu.classList.toggle('subsubmenu-active');
  //    });
  //   });

  // $('.submenu li').click(function() {
   
  //   $(this).find('.subsubmenu').addClass('active');
  // });
  
  // $('body').click(function(event) {
    
  //   if (!$(event.target).closest('.menu li').length) {
  //     $('.subsubmenu').removeClass('active');
  //   }
  // });
// ================================================================
