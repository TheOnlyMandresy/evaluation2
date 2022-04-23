import { party } from '../classes/game.js';
import * as GAMEMODE_HTML from '../html/gamemode.js';
import * as CONTROLLER from '../controller.js';

export function playMode (e)
{
    const mode = e.target.dataset.mode;

    party.gamemode(mode);
    endListeners();
    CONTROLLER.game();
}

export function infos (e)
{
    GAMEMODE_HTML.showHide(e.target.dataset.mode);
}

export function back ()
{
    endListeners();
    CONTROLLER.landing();
}

function endListeners ()
{
    const mode = document.querySelectorAll('[data-mode]');

    document.getElementById('back').removeEventListener('click', back);
    for (let x = 0; x < mode.length; x++) {
        mode[x].addEventListener('click', playMode);
        mode[x].addEventListener('mouseover', infos);
        mode[x].addEventListener('touchstart', infos);
    }
}