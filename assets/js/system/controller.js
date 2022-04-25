import * as HTML from './html/general.js';
import * as LANDING from './functions/landing.js';
import * as PLAYERS from './functions/players.js';
import * as GAMEMODE from './functions/gamemode.js';
import * as GAME from './functions/game.js';


export async function landing ()
{
    main.innerHTML = await HTML.loadPage('landing');

    LANDING.loadList();

    document.getElementById('newGame').addEventListener('click', LANDING.newGame);
    document.getElementById('addPlayers').addEventListener('click', LANDING.addPlayers);
    // document.getElementById('leaderBoard').addEventListener('click', LANDING.leaderBoard);
}

export async function players ()
{
    main.innerHTML = await HTML.loadPage('players');
    
    HTML.btnBack();
    PLAYERS.loadList();

    const back = document.getElementById('back');

    back.addEventListener('click', PLAYERS.back);
    document.querySelector('form').addEventListener('submit', PLAYERS.addPlayer);
    document.getElementById('add').addEventListener('click', PLAYERS.addPlayer);
}

export async function gamemode ()
{
    main.innerHTML = await HTML.loadPage('gamemode');

    HTML.btnBack();

    const back = document.getElementById('back'),
        mode = document.querySelectorAll('[data-mode]');

    back.addEventListener('click', GAMEMODE.back);
    for (let x = 0; x < mode.length; x++) {
        mode[x].addEventListener('click', GAMEMODE.playMode);
        mode[x].addEventListener('mouseover', GAMEMODE.infos);
        mode[x].addEventListener('touchstart', GAMEMODE.infos);
    }
}

export async function game ()
{
    main.innerHTML = await HTML.loadPage('game');

    GAME.initialize();
}
