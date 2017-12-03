import Map from './Map'
import Spritesheet from './Spritesheet';
import Sound from './Sound';

class Loader{
    constructor() {
        this._maps = {};
        this._spritesheets = [];
        this._sounds = [];
    }

    load() {
        return Promise.all([
            this.loadMap("level1"),
            this.loadMap("level2"),
            this.loadMap("level3"),
            this.loadMap("level4"),
            this.loadMap("level9"),
            this.loadSpritesheet("player"),
            this.loadSpritesheet("tileset"),
            this.loadSpritesheet("menu"),
            this.loadSound("footstep0"),
            this.loadSound("footstep1"),
            this.loadSound("footstep2"),
            this.loadSound("music")
        ]);
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

    loadSound(name) {
        this._sounds[`${name}`] = new Sound();
        return this._sounds[`${name}`].load(name);
    }

    getSound(name) {
        return this._sounds[`${name}`];
    }
}

const loader = new Loader();

export default loader;