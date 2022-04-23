import * as HTML from './general.js';


export function setPlayer (players)
{
    let playersList;

    for (let x = 0; x < players.length; x++) {
        const el = `
            <div id="${players[x].getId()}" class="card">
                <h2>${players[x].getName()}</h2>
                <p class="leaderboard">Non classé</p>
                <p data-infos="score" class="score">0</p>
                <p data-infos="victoires" class="victories">0</p>
            </div>
        `;

        console.log(players[x].getName());
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
            
            slide -= players[x].offsetWidth + 30;
            document.getElementById('players').style.transform = 'translate(' +slide+ 'px, -50%)';
            
            if (x !== players.length - 1) {
                setTimeout(() => {
                    x++;
                    show(x);
                }, 500);
            }
        }, 1000);
    }

    await players[0].classList.add('show');
    await show(1);
    return new Promise(resolve => setTimeout(resolve, 1500 * players.length));
}

export function selectPlayer (p, list)
{
    // const players = document.querySelectorAll('.card'),
    //     number = list.findIndex(obj => obj.getId() === p.getId());

        console.log(p);
        console.log(list);
        for (let x = 0; x < list.length; x++) {
            console.log(list[x].getName());
        }
    // console.log('starting:' + p.getName());
    
    // let slide = 0;

    // for (let x = 0; x < number; x++) {
    //     slide -= players[x].offsetWidth + 30;
    //     document.getElementById('players').style.transform = 'translate(' +slide+ 'px, -50%)';    
    // }

    // console.log(number);
    // document.getElementById(p.getId()).classList.add('active');
}

// export async function dice (n)
// {
//     document.getElementById('dice').classList.add('reveal', className);
// }