import loader from './Loader'
import Position from './utils/Position'
import {loadJson} from './utils/Utils'

export default class Map {

    constructor() {
        this.SPAWN_TILE = [7, 8, 9];
        this.COLLISIONS_TILE = [0, 5, 6, 11, 12, 13, 14, 15, 16, 17, 18];
        this.END_TILE = [10];
        this.TILE_SIZE = 64;
        this._data = [];
        this._spawns = [];
        this._ends = [];
    }

    async load(name) {
        let data = await loadJson(`./maps/${name}.json`);
        this._data = data.data;
        if (this._data) {
            for (let y = 0; y < 16; ++y) {
                for (let x = 0; x < 16; ++x) {
                    if (this.SPAWN_TILE.includes(this._data[y][x]))
                    this._spawns.push(new Position(x, y))
                    if (this.END_TILE.includes(this._data[y][x]))
                    this._ends.push(new Position(x, y))
                }
            }
        }
        return true;
    }

    render(ctx) {
        let tileset = loader.getSpritesheet("tileset");

        for (let y = 0; y < 16; ++y) {
            for (let x = 0; x < 16; ++x){
                if (this._data[y][x] != 0)
                    tileset.render(ctx, x * this.TILE_SIZE, y * this.TILE_SIZE, this._data[y][x]);
            }
        }
    }

    getCollisions(pos) {
        let left = false;
        let right = false;
        let up = false;
        let down = false;
        if (this._data[pos.y][pos.x - 1] === undefined || this.COLLISIONS_TILE.includes(this._data[pos.y][pos.x - 1]))
            left = true;
        if (this._data[pos.y][pos.x + 1] === undefined || this.COLLISIONS_TILE.includes(this._data[pos.y][pos.x + 1]))
            right = true;
        if (this._data[pos.y + 1] === undefined || this._data[pos.y + 1][pos.x] === undefined || this.COLLISIONS_TILE.includes(this._data[pos.y + 1][pos.x]))
            down = true;
        if (this._data[pos.y - 1] === undefined || this._data[pos.y - 1][pos.x] === undefined || this.COLLISIONS_TILE.includes(this._data[pos.y - 1][pos.x]))
            up = true;
        return {left, right, up, down}
    }

    get spawns() {
        return this._spawns
    }

    get ends() {
        return this._ends;
    }
}