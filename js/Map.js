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
        for (let y = 0; y < 16; ++y) {
            for (let x = 0; x < 16; ++x){
                ctx.fillStyle = "#002800";
                ctx.fillRect(x * 64, y * 64, 63, 63);
            }
        }
    }
}