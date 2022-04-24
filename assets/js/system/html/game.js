import { party } from '../classes/game.js';
import * as HTML from './general.js';


export function setPlayer (players)
{
    let playersList;

    for (let x = 0; x < players.length; x++) {
        const el = `
            <div data-player="${players[x].getId()}" class="card">
                <h2>${players[x].getName()}</h2>
                <p class="leaderboard">Non classé</p>
                <p data-infos="score" class="score">0</p>
                <p data-infos="victoires" class="victories">${players[x].ranking()}</p>
            </div>
        `;

        (x === 0) ? playersList = el : playersList += el;
    }

    HTML.addElement(document.getElementById('players'), playersList);
}

export function endWaiting ()
{
    const loader = document.getElementById('loader');

    loader.classList.add('end');

    setTimeout(() => {
        loader.remove();
    }, 500);
}

export async function showPlayers ()
{
    const players = document.querySelectorAll('.card');

    let slide = 0;

    const show = await function (x) {
        setTimeout(() => {
            setTimeout(() => {
                players[x].classList.add('show');
            }, 500);
            
            slide -= players[x-1].offsetWidth + 30;
            document.getElementById('players').style.transform = 'translate(' + (slide - (players[x].offsetWidth / 2)) + 'px, -50%)';
            
            if (x !== players.length - 1) {
                setTimeout(() => {
                    x++;
                    show(x);
                }, 500);
            }
        }, 1000);
    }

    const firstEl = () => {
        document.getElementById('players').style.transform = 'translate(' +((players[0].offsetWidth / 2) * -1)+ 'px, -50%)';
        players[0].classList.add('show');
    }

    await firstEl();
    await show(1);
    return new Promise(resolve => setTimeout(resolve, 1500 * players.length));
}

export function selectPlayer (p, list)
{
    const players = document.querySelectorAll('.card'),
        number = list.findIndex(obj => obj.getId() === p),
        move = px => {document.getElementById('players').style.transform = 'translate(' +px+ 'px, -50%)';};
    
    let slide = 0;

    if (number === 0) move(slide - (players[0].offsetWidth / 2));

    for (let x = 0; x < number; x++) {
        slide -= players[x].offsetWidth + 30;
        move(slide - (players[x+1].offsetWidth / 2));
    }

    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.add('slide');
        document.querySelector('.active').classList.remove('active');
    }

    setTimeout(() => {
        document.querySelector('[data-player="' +p+ '"]').classList.remove('slide', 'show');
        document.querySelector('[data-player="' +p+ '"]').classList.add('active');
    }, 500);
}

export function showController ()
{
    setTimeout(() => {
        document.getElementById('controller').classList.add('show');
    }, 500);
}

export async function roll ()
{
    let dice;

    await new Promise(resolve => setTimeout(() => {
        dice = Math.floor(Math.random() * 7);;

        resolve(true);
    }, 1000));

    return scoreRound(dice);
}

export function saveScore (id)
{
    const card = document.querySelector('[data-player="' +id+ '"]'),
        score = card.querySelector('[data-infos="score"]'),
        round = document.getElementById('round'),
        add = parseInt(round.innerText) + parseInt(score.innerText);


    pointMP3.play();

    round.innerText = '';
    score.innerText = add;
}

export function winner (id)
{
    const card = document.querySelector('[data-player="' +id+ '"]');

    const el = `
        <div id="winner">
            <h2>Nous avons notre gagnant.e!</h2>
            <h1>${card.querySelector('h2').innerText}</h1>
            <p>
                Félicitations à vous! Vous êtes vraiment un être au dessus des perdants! Vous avez fait preuve de sagesse, de réflexion, de calme, d'humilité. Franchement, si vous vous en ventiez, même moi je me prosternerai.
            </p>

            <div class="buttons">
                <button data-menu="restart">Recommencer</button>
                <button data-menu="landing">Menu principal</button>
            </div>
        </div>
    `;

    winnerMP3.play();

    HTML.addElement(document.body, el);
}

export function hideWinner ()
{
    document.getElementById('winner').remove();
}

async function scoreRound (n)
{
    const round = document.getElementById('round'),
        add = (round.querySelector('p')) ? parseInt(round.querySelector('p').innerText) + n : n;
    
    if (n <= 1) {
        loseMP3.play();
        if (round.querySelector('p')) round.querySelector('p').classList.add('lost');
        await new Promise(resolve => setTimeout(() => {
            round.innerText = '';
            resolve(true);
        }, 1000));
        return 0;
    }

    winMP3.play();
    const el = `<p>${add}</p>`;
    round.innerHTML = el;
    setTimeout(() => { round.dataset.last = '+' +add; }, 1000);
    return add;
}