import { party } from '../classes/game.js';
import * as GAME_HTML from '../html/game.js';
import * as CONTROLLER from '../controller.js';

export async function initialize ()
{
    await GAME_HTML.setPlayer(party.allPlayers());
    await party.setOrder();
    await GAME_HTML.endWaiting();
    await GAME_HTML.showPlayers();

    GAME_HTML.showController();
    await GAME_HTML.selectPlayer(party.getOrder()[0], party.allPlayers());
    
    start();
}

async function start ()
{
    console.log('partie start');

    setTimeout(() => { GAME_HTML.selectPlayer(party.getOrder()[1], party.allPlayers()); }, 2000);
    // GAME_HTML.dice(5);
}