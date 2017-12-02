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
        this._players = this._map.spawns.map(pos => {
            return new Player(pos, name);
        })
    }

    update(delta) {
        this._players.forEach(player => player.update(delta));
    }

    render(ctx) {
        if (this._map !== null)
            this._map.render(ctx);
        this._players.forEach(elem => {
            elem.render(ctx);
        })
    }
}