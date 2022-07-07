
const h1 = document.querySelector("div.hello:first-child h1");



function handleMouseEnter() {
    h1.innerText = "The mouse is here!";
    h1.style.color = "red";
}

function handleMouseLeave() {
    h1.innerText = "The mouse is gone!";
    h1.style.color = "grey";
}

function handleWindowResize() {
    // document.body.style.backgroundColor = "yellow";
    h1.innerText = "You Just resized!";
    h1.style.color = "green";
}

function handleContextMenu() {
    h1.innerText = "That was a right click!";
    h1.style.color = "orange";
}



h1.addEventListener("mouseenter", handleMouseEnter);
h1.addEventListener("mouseleave", handleMouseLeave);

window.addEventListener("contextmenu", handleContextMenu);
window.addEventListener("resize", handleWindowResize);


// 클릭했을때 글씨 색상 바뀌는 법

// function handTitleClick(){
//     h1.style.color = "blue";
// }

//복사했을때 알림뜨는 법

// function handleWindowCopy() {
//     alert("copier!");
// }


//와이파이 켜졌을때 알림뜨는 법
// function handleWindowOffline() {
//     alert("SOS no wifi")
// }

//와이파이 꺼졌을때 알림뜨는 법
// function handleWindowOnline() {
//     alert("All Good");
// }


// 자바스크립트 동작하는 방법 1

// h1.addEventListener("click", handTitleClick);
// h1.addEventListener("mouseenter", handleMouseEnter);
// h1.addEventListener("mouseleave", handleMouseLeave);


// 자바스크립트 다른 방법 2

// h1.onclick = handleTitleClick;
// h1.onmouseenter = handleMouseEnter;
// h1.onmouseleave = handleMouseLeave;

// window.addEventListener("resize", handleWindowResize);
// window.addEventListener("copy", handleWindowCopy);
// window.addEventListener("offline", handleWindowOffline);
// window.addEventListener("online", handleWindowOnline);