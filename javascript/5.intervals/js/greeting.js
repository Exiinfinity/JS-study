const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY ="username";

function onLoginSubmit(event) {
    // 1.event가 원하는 행동을 멈춘다.
    event.preventDefault();
    // 2. form을 다시 숨긴다.
    loginForm.classList.add(HIDDEN_CLASSNAME); 
    // 3. loginInput.value를 username이라는 변수로 저장
    const username = loginInput.value;
    // 4. username 값을 username이라는 key와 함께 local storage에 저장
    localStorage.setItem(USERNAME_KEY, username);
    // greeting.innerText = "Hello " + username;
    // 5. paintGreetings함수 호출
    paintGreetings();
}

function paintGreetings() {
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

// javascript가 가장 먼저하는 것. localStorage확인
const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings();
}