const main = document.querySelector('main');

let arrowSVG;
const loadArrowSVG = fetch('assets/img/SVG/arrow.svg').then(res => res.text()).then(svg => arrowSVG = svg);