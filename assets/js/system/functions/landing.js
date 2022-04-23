import { party } from '../classes/game.js';
import * as HTML from '../html/general.js';
import * as LANDING_HTML from '../html/landing.js';
import * as CONTROLLER from '../controller.js';


export function newGame (e)
{
    if (party.allPlayers(true) < 2) return HTML.flash('Il faut être minimum 2 pour jouer');

    endListeners();
    CONTROLLER.gamemode();
}

export async function addPlayers (e)
{
    endListeners();
    CONTROLLER.players();
}

export async function leaderBoard (e)
{
    endListeners();
    
    const page = await fetch('assets/pages/leaderboard.html').then(res => res.text());
    main.innerHTML = page;
}

export function loadList ()
{
    LANDING_HTML.loadList(party.allPlayers(true));
}

function endListeners ()
{
    document.getElementById('newGame').removeEventListener('click', newGame);
    document.getElementById('addPlayers').removeEventListener('click', addPlayers);
    document.getElementById('leaderBoard').removeEventListener('click', leaderBoard);
}