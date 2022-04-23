import { party } from '../classes/game.js';
import * as GAME_HTML from '../html/game.js';
import * as CONTROLLER from '../controller.js';

export async function initialize ()
{
    await GAME_HTML.setPlayer(party.allPlayers());
    await party.setOrder();
    await GAME_HTML.endWaiting();
    await GAME_HTML.showPlayers();
    await GAME_HTML.selectPlayer(party.getOrder(), party.allPlayers());
    
    start();
}

async function start ()
{
    console.log('partie start');
    // GAME_HTML.dice(5);
}