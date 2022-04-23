import { Player } from "./player.js";

class Game
{
    #mode = 'default';
    #list = [];
    #order = [];

    newPlayer (name)
    {
        this.#list.push(new Player(name));
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
        const found = this.#list.findIndex(obj => obj.getId() === id);
        this.#list.splice(found, 1);
    }

    gamemode (mode)
    {
        this.#mode = mode;
    }

    setOrder ()
    {
        this.#order = this.allPlayers();
        
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
}

export const party = new Game();