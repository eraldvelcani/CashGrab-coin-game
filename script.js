const screen = document.querySelectorAll('.screen');
const gameContainer = document.querySelector('.game-container');
const start = document.getElementById('start-btn');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const message3 = document.getElementById('message3');
const time = document.getElementById('time');
const score = document.getElementById('score');

let seconds = 0;
let points = 0;

function getRandCoord() {
    const w = window.innerWidth;
    const h = window.innerHeight; 
    const x = Math.random() * (w - 200) + 100;
    const y = Math.random() * (h - 200) + 100;
    return {x, y};
};

function incrPoints() {
    points++;
    score.innerHTML = `Score: ${points}`;
    if (points === 20) {
        message1.classList.add('visible');
        setTimeout(() => message1.classList.remove('visible'), 3000);
    }
    if (points === 500) {
        message2.classList.add('visible');
        setTimeout(() => message2.classList.remove('visible'), 3000);
    }
    if (points === 1000000) {
        message3.classList.add('visible');
        setTimeout(() => message3.classList.remove('visible'), 3000);
    }
}

function collectCoin() {
    incrPoints();
    this.classList.add('clicked');
    setTimeout(() => this.remove(), 2000);
    spawnCoins();
};


function incrTime() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    time.innerHTML = `Time: ${min}:${sec}`;
    seconds++;
}

function spawnCoin() {
    setTimeout(createCoin, 1200);
    setTimeout(createCoin, 1400);
}

function startGame() {
    setInterval(incrTime, 1000);
};


start.addEventListener('click', () => {
    screen[0].classList.add('up');              //making it arr leaves open for other screens
    setTimeout(createCoin, 1000);
    startGame();
}); 

function createCoin() {
    const coin1 = document.createElement('div');
    coin1.classList.add('coin1');
    const {x, y} = getRandCoord();
    coin1.style.left = `${x}px`;
    coin1.style.top = `${y}px`;
    coin1.innerHTML = `<img src="./img/dollar.png" style="transform: rotate(${Math.random() * 360}deg)" alt="">`;
    coin1.addEventListener('click', () => collectCoin());
    gameContainer.appendChild(coin1);
}