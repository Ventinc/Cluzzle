import loader from './Loader'
import {loadJson} from './utils/Utils'

export default class Map {
    constructor() {
        this._data = [];
    }

    async load(name) {
        let data = await loadJson(`./maps/${name}.json`);
        this._data = data.data;
        return true;
    }

    render(ctx) {
        let tileset = loader.getSpritesheet("tileset");

        for (let y = 0; y < 16; ++y) {
            for (let x = 0; x < 16; ++x){
                tileset.render(ctx, x, y, this._data[y][x]);
            }
        }
    }
}