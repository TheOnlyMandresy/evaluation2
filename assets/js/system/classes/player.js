export class Player
{
    #id;
    #name;
    #palmares = 0;
    #points = 0;

    constructor (name)
    {
        this.#name = name;
        this.#id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    }

    set score (p)
    {
        this.#points += p;
    }

    get score ()
    {
        return this.#points;
    }

    getId ()
    {
        return this.#id;
    }

    getName ()
    {
        return this.#name;
    }

    winner ()
    {
        this.#palmares += 1;
    }

    ranking ()
    {
        return this.#palmares;
    }
}