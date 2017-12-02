import Map from './Map'
import Player from './Player'
import loader from './Loader'

export default class Level {
    constructor() {
        this._map = null;
        this._players = [];
    }

    load(name) {
        this._map = loader.getMap(name);
        this._players = [];
        if (this._map !== undefined && this._map !== null) {
            this._players = this._map.spawns.map(pos => {
                return new Player(pos, name);
            })
        }
    }

    update(delta) {
        this._players.forEach(player => player.update(delta));
    }

    isFinish() {
        let countFinish = 0;
        if (this._map !== null && this._map !== undefined && this._players.length > 0) {
            this._map.ends.forEach(elem => {
                this._players.forEach(player => {
                    if (player.moveState == -1 && elem.x == player.pos.x && elem.y == player.pos.y)
                        countFinish += 1;
                })
            })
        }
        return countFinish >= this._players.length;
    }

    render(ctx) {
        if (this._map !== null && this._map !== undefined)
            this._map.render(ctx);
        this._players.forEach(elem => {
            elem.render(ctx);
        })
    }
}