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

    getPlayerById (id)
    {
        return this.#list.find(obj => obj.getId() === id);
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

    getMode ()
    {
        return this.#mode;
    }

    async setOrder ()
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

    async nextPlayer ()
    {
        if (this.#mode === 'shuffle') this.#turn = Math.floor(Math.random() * (this.allPlayers(true) - 1));
        
        if (this.#mode !== 'shuffle') {
            if (this.#turn !== this.allPlayers(true)) this.#turn++;
            if (this.#turn === this.allPlayers(true)) this.#turn = 0;
        }
    }

    async setTurn ()
    {
        this.#turn = 0;
    }

    getTurn ()
    {
        return this.#turn;
    }
}

export const party = new Game();