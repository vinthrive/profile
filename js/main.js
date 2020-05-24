//Select DOM items
const oBody = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const homeBody = document.querySelector("#bg-img");
const oHomeLink = document.querySelector('.nav-item a[href="index.html"]');
const oAboutLink = document.querySelector('.nav-item a[href="about.html"]');
const oWorkLink = document.querySelector('.nav-item a[href="work.html"]');
const oContactLink = document.querySelector('.nav-item a[href="contact.html"]');
const oItemOverview = document.querySelectorAll(
  ".item .item-wrapper .item-overview"
);
const workBtnOverview = document.querySelectorAll(
  ".item .item-wrapper .btn-overview"
);

//Set Initial State of menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);
menuBranding.onclick = fClickMenuBtn;
menuNav.onclick = fClickMenuBtn;
menuBranding.onkeypress = fClickMenuBtn;
menuBtn.onkeypress = fClickMenuBtn;
function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));
    // oHomeLink.focus();
    //Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //Set Menu State
    showMenu = false;
  }
}

function fClickMenuBtn() {
  menuBtn.click();
}

//Copied code from https://codepen.io/quasimondo/pen/lDdrF
var colors = new Array(
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgba(" + r1 + "," + g1 + "," + b1 + ",0.7)";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  let homeOverlay = homeBody.getElementsByClassName("overlay")[0];

  homeOverlay.style.background =
    "-webkit-gradient(linear, left top, right top, from(" +
    color1 +
    "), to(" +
    color2 +
    "))";
  homeOverlay.style.background =
    "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)";

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

if (homeBody != undefined) {
  setInterval(updateGradient, 10);
}

if (workBtnOverview.length > 0) {
  let btnOverview;
  for (let ctr = 0; ctr < workBtnOverview.length; ctr++) {
    btnOverview = workBtnOverview[ctr];

    btnOverview.onclick = function() {
      let itemWrapper = this.parentElement;
      let itemOverview = itemWrapper.querySelector(".item-overview");
      let itemOverviewClose = itemWrapper.querySelector(
        ".item-overview-btn-close"
      );
      itemOverview.classList.add("show-overview");
      itemOverviewClose.classList.add("item-overview-btn-close-show");

      itemOverviewClose.onclick = function() {
        itemOverview.classList.remove("show-overview");
        itemOverviewClose.classList.remove("item-overview-btn-close-show");
      };
    };
  }
}

if (oItemOverview.length > 0) {
  let oOverview;

  for (let ctr = 0; ctr < oItemOverview.length; ctr++) {
    oOverview = oItemOverview[ctr];

    oOverview.onclick = function() {
      let itemWrapper = this.parentElement;
      // let itemOverviewClose = itemWrapper.querySelector(
      //   ".item-overview-btn-close"
      // );

      // itemOverviewClose.click();
    };
  }
}

let codeset = {
  Escape: false,
  Alt: false,
  "1": false,
  "2": false,
  "3": false,
  "4": false
};

oBody.onkeydown = fBodyKeyDown;
oBody.onkeyup = fBodyKeyUp;

function fBodyKeyDown(event) {
  console.log("keydown event.key = " + event.key);

  if (event.key in codeset) {
    codeset[event.key] = true;

    if (codeset["Escape"]) {
      fClickMenuBtn();
      return;
    } else if (codeset["Alt"]) {
      if (codeset["1"]) {
        oHomeLink.click();
        return;
      } else if (codeset["2"]) {
        oAboutLink.click();
        return;
      } else if (codeset["3"]) {
        oWorkLink.click();
        return;
      } else if (codeset["4"]) {
        oContactLink.click();
        return;
      }
    }
  }
}

function fBodyKeyUp(event) {
  console.log("keyup event.key = " + event.key);
  // Reset key
  if (event.key in codeset) {
    codeset[event.key] = false;
  }
}
