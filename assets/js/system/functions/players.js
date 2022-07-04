import { party } from '../classes/game.js';
import * as HTML from '../html/general.js';
import * as PLAYERS_HTML from '../html/players.js';
import * as CONTROLLER from '../controller.js';


let clearBtn;

export async function addPlayer (e)
{
    e.preventDefault();
    const input = document.querySelector('input');
    const name = input.value;
    const check = name.replaceAll(' ', '');

    if (check === '') return HTML.flash('Veuillez remplir le champs');
    if (name.length > 15) return HTML.flash('Le nom du joueur est trop long');
    if (party.getPlayer(name)) return HTML.flash('Ce joueur est déjà inscrit');

    input.value = '';
    party.newPlayer(name);

    await PLAYERS_HTML.addPlayer(party.getPlayer(name));

    loadList();
}

export async function clearPlayers ()
{
    const listeners = document.querySelectorAll('[data-remove]');

    party.clean();

    for (let x = 0; x < listeners.length; x++)
    {
        listeners[x].removeEventListener('click', removePlayer);
    }

    await PLAYERS_HTML.clearPlayers();
    
    clearBtn.removeEventListener('click', clearPlayers);
    clearBtn.remove();
    clearBtn = null;
}

export async function loadList ()
{
    await PLAYERS_HTML.loadList(party.allPlayers());

    if (party.allPlayers(true) !== 0)
    {
        await PLAYERS_HTML.addPlayer();
        
        if (!clearBtn)
        {
            clearBtn = document.getElementById('clear');
            clearBtn.addEventListener('click', clearPlayers);
        }
    }

    for (let x = 0; x < party.allPlayers(true); x++)
    {
        document.querySelectorAll('[data-remove]')[x].addEventListener('click', removePlayer);
    }
}

export function back (e)
{
    endListeners();
    CONTROLLER.landing();
}

async function removePlayer (e)
{
    const id = e.target.dataset.remove;

    party.removePlayer(id);
    
    document.querySelector('button[data-remove="' +id+ '"]').addEventListener('click', removePlayer);
    PLAYERS_HTML.removePlayer(id);
    if (party.allPlayers(true) == 0) await clearPlayers();
}

function endListeners ()
{
    if (clearBtn)
    {
        clearBtn.removeEventListener('click', clearPlayers);
        clearBtn = null;
    }

    document.getElementById('back').removeEventListener('click', back);
    document.querySelector('form').removeEventListener('submit', addPlayer);
    document.getElementById('add').removeEventListener('click', addPlayer);

    for (let x = 0; x < party.allPlayers(true); x++)
    {
        document.querySelectorAll('[data-remove]')[x].removeEventListener('click', removePlayer);
    }
}