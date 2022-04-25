const main = document.querySelector('main');

let arrowSVG;
const loadArrowSVG = fetch('assets/medias/SVG/arrow.svg').then(res => res.text()).then(svg => arrowSVG = svg);

const winMP3 = new Audio('assets/medias/audio/win.mp3');
    winMP3.volume = .2;
const pointMP3 = new Audio('assets/medias/audio/point.mp3');
    pointMP3.volume = .2;
const loseMP3 = new Audio('assets/medias/audio/lose.mp3');
    loseMP3.volume = .2;
const winnerMP3 = new Audio('assets/medias/audio/winner.wav');
    winnerMP3.volume = .2;