import { Player } from "./player.js";

class Game
{
    #mode = 'default';
    #list = [];
    #order = [];
    #turn = 0;

    newPlayer (name)
    {
        const obj = new Player(name);
        this.#list.push(obj);
        this.#order.push(obj.getId());
    }

    allPlayers (count = false)
    {
        return (count) ? this.#list.length : this.#list;
    }

    getPlayer (name)
    {
        return this.#list.find(obj => obj.getName() === name);
    }

    removePlayer (id)
    {
        const removeList = this.#list.findIndex(obj => obj.getId() === id),
            removeOrder = this.#order.findIndex(obj => obj === id);

        this.#list.splice(removeList, 1);
        this.#order.splice(removeOrder, 1);
    }

    gamemode (mode)
    {
        this.#mode = mode;
    }

    setOrder ()
    {
        for(let x = this.#order.length - 1; x >= 1; x--) {
            let j = Math.floor(Math.random() * (x + 1));
            let temp = this.#order[j];
            this.#order[j] = this.#order[x];
            this.#order[x] = temp;
        }
    }

    getOrder ()
    {
        return this.#order;
    }

    clean ()
    {
        this.#list = [];
    }

    nextPlayer ()
    {
        if (this.#turn !== this.allPlayers(true)) this.#turn++;
        if (this.#turn === this.allPlayers(true)) this.#turn = 0;
    }

    getTurn ()
    {
        return this.#turn;
    }
}

export const party = new Game();