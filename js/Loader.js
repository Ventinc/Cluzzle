import Map from './Map'

class Loader{
    constructor() {
        this._maps = {};
        this._spritesheets = [];
    }

    load() {
        return Promise.all([
            this.loadMap("level1")
        ])
    }

    async loadMap(name) {
        this._maps[`${name}`] = new Map();
        return this._maps[`${name}`].load(name);
    }

    getMap(name) {
        return this._maps[`${name}`];
    }

    loadSpritesheet(name) {

    }

    getSpritesheet(name) {

    }
}

const loader = new Loader();

export default loader;