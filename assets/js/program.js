//set cookies
function setSessionCookies(name, data) {
  document.cookie = `${name}=${data}`;
}

//get cookies
function getSessionCookies(name) {
  for (item of document.cookie.split("; ").reverse()) {
    if (item.split("=")[0] == name) {
      return item.split("=")[1];
    }
  }
  return false;
}

// theam change
const changeMode = () => {
  var root = document.querySelector(":root");
  let colors = [
    // ["popertyName", "light", "dark"],
    ["--theme-bg-color", "#0D0D0D", "#fff"],
    ["--theme-color-a", "#fff", "#181818"],
    ["--theme-color-a-o", "#181818", "#fff"],
    ["--theme-color-b", "#C5C5C5", "#181818"],
    ["--theme-color-c", "#808080", "#181818"],
    [
      "--theme-color-navbar-bg",
      "rgba(24, 24, 29, 0.30)",
      "rgba(255, 255, 255, 0.25)",
    ],
    [
      "--theme-color-mobile-navbar-bg",
      "rgba(24, 24, 29, 0.60)",
      "rgba(24, 24, 29, 0.3)",
    ],
    ["--theme-color-mobile-a", "rgba(255, 255, 255, 0.26)", "#0D0D0D"],
    [
      "--theme-color-m-nav-item",
      "rgba(255, 255, 255, 0.10)",
      "rgba(21, 21, 21, 0.50)",
    ],
    ["--theme-color-proj-card-border", "#383737", "#fff"],
  ];
  if (getSessionCookies("theme-color") == "dark") {
    colors.forEach((item) => {
      root.style.setProperty(item[0], item[1]);
    });
  } else if (getSessionCookies("theme-color") == "light") {
    colors.forEach((item) => {
      root.style.setProperty(item[0], item[2]);
    });
  }
};
document.onload = changeMode();

function themeChange() {
  if (getSessionCookies("theme-color") == "dark") {
    setSessionCookies("theme-color", "light");
  } else {
    setSessionCookies("theme-color", "dark");
  }
  changeMode();
}

// mobile nav item//
const mobileMenuItems = document.querySelectorAll(".m-nav-item");
mobileMenuItems.forEach(function (items) {
  items.addEventListener("click", function () {
    for (x of mobileMenuItems) {
      x.classList.remove("active");
      x.querySelector("a").children[0].classList.remove("d-none");
      x.querySelector("a").children[1].classList.add("d-none");
    }
    items.classList.add("active");
    items.querySelector("a").children[1].classList.remove("d-none");
    items.querySelector("a").children[0].classList.add("d-none");
  });
});

window.onload = (e) => {
  document.body.style.overflowY = "visible";
};

// //////////////// side nav ///////////////////

const sideNavBtn = document.querySelector("#side-nav-btn");
const sideNav = document.querySelector(".side-nav");

sideNavBtn.addEventListener("click", () => {
  if (sideNav.classList[sideNav.classList.length - 1] != "active") {
    sideNav.style.transform = "translateX(0%)";
    sideNav.style.transition = ".5s";
    sideNav.classList.add("active");
    document.body.style.overflowY = "hidden";
  }
  // else{
  //   sideNav.style.transform = "translateX(100%)";
  //   sideNav.classList.remove("active");
  //   document.body.style.overflowY = "visible";
  // }
});

function touchInElement(tElement, tData) {
  return tData.touches[0].clientX > tElement.x &&
    tData.touches[0].clientY > tElement.y
    ? true
    : false;
}

var touchIn1, elemInfo, clickIn;
document.addEventListener("touchstart", (e) => {
  if (sideNav.classList.contains("active")) {
    touchIn1 = e;
    elemInfo = sideNav.getBoundingClientRect();
    clickIn = touchInElement(elemInfo, e);
  }
});
document.addEventListener("touchmove", (e) => {
  if (sideNav.classList.contains("active")) {
    sideNav.style.transition = "0s";
    if (!clickIn && touchInElement(elemInfo, e)) {
      if (e.touches[0].clientX - elemInfo.x > 0) {
        sideNav.style.transform = `translateX(${
          e.touches[0].clientX - elemInfo.x
        }px)`;
      }
    } else if (clickIn) {
      if (e.touches[0].clientX - touchIn1.touches[0].clientX > 0) {
        sideNav.style.transform = `translateX(${
          e.touches[0].clientX - touchIn1.touches[0].clientX
        }px)`;
      }
    }
  }
});

document.addEventListener("touchend", (e) => {
  if (sideNav.classList.contains("active")) {
    if (
      (e.changedTouches[0].clientX - touchIn1.changedTouches[0].clientX) /
        (e.timeStamp - touchIn1.timeStamp) >
        1 ||
      (clickIn
        ? e.changedTouches[0].clientX - touchIn1.changedTouches[0].clientX
        : e.changedTouches[0].clientX - elemInfo.x) >
        elemInfo.width / 1.5
    ) {
      sideNav.style.transform = "translateX(100%)";
      sideNav.classList.remove("active");
      setTimeout(() => {
        document.body.style.overflowY = "visible";
      }, 20);
    } else {
      sideNav.style.transition = ".5s";
      sideNav.style.transform = "translateX(0%)";
    }
  }
});

// hand shake
setInterval(() => {
  document.querySelector(".hand").classList.toggle("shake");
}, 4000);

//open resume without downloading it on device
// function viewResume() {
//   if (window.innerWidth < 768) {
//     window.open(
//       "https://docs.google.com/viewerng/viewer?url=https://acitedu.com/sayan/resume/sayan-resume.pdf"
//     );
//   } else window.location.href = "resume/sayan-resume.pdf";
// }

let mNavBar = document.querySelector(".mobile-nav");
let isScrollUp,
  isMobile,
  lastScroll = 0;

window.onload = () => {
  window.scroll(0, 0);
  isMobile = window.innerWidth < 576 ? true : false;
};

window.onscroll = () => {
  isScrollUp = lastScroll > window.scrollY ? false : true;
  lastScroll = window.scrollY;
  mNavBar.style.transform =
    isScrollUp && isMobile ? "translateY(130%)" : "translateY(0%)";
};