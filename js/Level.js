import Map from './Map'
import loader from './Loader'

export default class Level {
    constructor() {
        this._map = null;
        this._players = [];
    }

    load(name) {
        this._map = loader.getMap(name);
    }

    update(delta) {

    }

    render(ctx) {
        if (this._map !== null)
            this._map.render(ctx);
    }
}