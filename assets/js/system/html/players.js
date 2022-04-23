import * as HTML from './general.js';


let list;

export async function addPlayer ()
{
    const btn = '<button id="clear">nettoyer</button>';
    if (!document.getElementById('clear')) await HTML.addElement(document.querySelector('.buttons'), btn);
}

export function clearPlayers ()
{
    document.getElementById('allPlayers').innerHTML = '';
}

export function removePlayer (id)
{
    document.getElementById(id).remove();
}

export function loadList (players)
{
    list = document.getElementById('allPlayers');
    let playersList;

    for (let x = 0; x < players.length; x++) {
        const el = `
            <li id="${players[x].getId()}">
                <p>${players[x].getName()}</p>
                <button class="danger" data-remove="${players[x].getId()}">Retirer</button>
            </li>
        `;

        (x === 0) ? playersList = el : playersList += el;
    }

    if (players.length !== 0) list.innerHTML = playersList;
}