import Map from './Map'
import Spritesheet from './Spritesheet';

class Loader{
    constructor() {
        this._maps = {};
        this._spritesheets = [];
    }

    load() {
        return Promise.all([
            this.loadMap("level1"),
            this.loadMap("test"),
            this.loadSpritesheet("player"),
            this.loadSpritesheet("tileset")
        ]).catch(e => console.error(e))
    }

    async loadMap(name) {
        this._maps[`${name}`] = new Map();
        return this._maps[`${name}`].load(name);
    }

    getMap(name) {
        return this._maps[`${name}`];
    }

    loadSpritesheet(name) {
        this._spritesheets[`${name}`] = new Spritesheet();
        return this._spritesheets[`${name}`].load(name); 
    }

    getSpritesheet(name) {
        return this._spritesheets[`${name}`]
    }
}

const loader = new Loader();

export default loader;