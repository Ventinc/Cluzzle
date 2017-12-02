import {loadImage} from './utils//Utils'

export default class Spritesheet {
    constructor() {
        this._image = null;
        this._width = 0;
        this._height = 0;
        this._tilesize = 64;
    }

    async load(name) {
        this._image = await loadImage(`./assets/${name}.png`);
        console.log(this._image);
        this._width = this._image.width;
        this._height = this._image.width;
        return true;
    }

    render(ctx, x, y, type) {
        let numberTileWidth = this._width / this._tilesize;
        let sourceTileY = Math.ceil(type / numberTileWidth);
        let sourceTileX = type % numberTileWidth;
        if (sourceTileX == 0) sourceTileX = numberTileWidth;
        let sx = (sourceTileX - 1) * this._tilesize 
        let sy = (sourceTileY - 1) * this._tilesize 
        
        ctx.drawImage(this._image,
            sx, sy,
            this._tilesize, this._tilesize,
            x * this._tilesize, y * this._tilesize,
            this._tilesize, this._tilesize);
    }
}