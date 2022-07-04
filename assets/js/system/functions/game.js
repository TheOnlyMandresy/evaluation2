import { party } from '../classes/game.js';
import * as GAME_HTML from '../html/game.js';
import * as CONTROLLER from '../controller.js';

export async function initialize ()
{
    await GAME_HTML.setPlayer(party.allPlayers());
    await party.setOrder();
    await party.setTurn();
    await GAME_HTML.endWaiting();
    await GAME_HTML.showPlayers();

    GAME_HTML.showController();
    await GAME_HTML.selectPlayer(party.getOrder()[party.getTurn()], party.allPlayers());
    
    setTimeout(setButtons, 1000);
}

function setButtons ()
{
    document.querySelector('#diceSVG > path').addEventListener('click', choice);
    document.querySelector('#trophySVG > path').addEventListener('click', choice);
}

async function roll ()
{
    let round;
    
    await GAME_HTML.roll().then(res => { round = res; });

    if (round === 0) return nextPlayer();

    setTimeout(setButtons, 500);
}

function choice (e)
{
    const [target, turn] = [ e.target.parentNode.id, party.getOrder()[party.getTurn()] ];

    document.querySelector('#diceSVG > path').removeEventListener('click', choice);
    document.querySelector('#trophySVG > path').removeEventListener('click', choice);

    if (target === 'diceSVG') return roll('roll');
    
    GAME_HTML.saveScore(turn);

    const score = document.querySelector('[data-player="' +turn+'"]').querySelector('[data-infos="score"]');

    if (parseInt(score.innerText) >= 100) return winner(turn);

    setTimeout(nextPlayer, 1000);
}

async function nextPlayer ()
{
    await party.nextPlayer();
    await GAME_HTML.selectPlayer(party.getOrder()[party.getTurn()], party.allPlayers());
    
    setTimeout(setButtons, 1000);
}

async function winner (id)
{
    party.getPlayerById(id).winner();
    await GAME_HTML.winner(id);

    document.querySelector('button[data-menu="restart"]').addEventListener('click', end);
    document.querySelector('button[data-menu="landing"]').addEventListener('click', end);
}

async function end (e)
{
    const target = e.target.dataset.menu;

    document.querySelector('button[data-menu="restart"]').removeEventListener('click', end);
    document.querySelector('button[data-menu="landing"]').removeEventListener('click', end);

    await GAME_HTML.hideWinner();

    if (target === 'restart') return CONTROLLER.game();
    if (target === 'landing') return CONTROLLER.landing();
}