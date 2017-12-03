import Position from './utils/Position'
import Vector from './utils/Vector'
import Keyboard from './Keyboard'
import loader from './Loader'

export default class Player {
    constructor(pos, mapName) {
        this.TILE_SIZE = 64;
        this.ANIMATION_TIME = 14;
        this._mapName = mapName;
        this._pos = pos;
        this._moves = [
            [1, 2, 3], //down
            [4, 5, 6], //left
            [7, 8, 9], //up
            [10, 11, 12] //right
        ];
        this._vector = new Vector();
        this._move = {
            state: -1,
            frame: 0,
            last_play: -1,
            direction: 0, // 0: down, 1: left, 2: up, 3: right
            offset: new Position()
        };

        this._move.offset.set({x: 0, y: 0});
    }

    setNextMove (type, orientation) {
        let map = loader.getMap(this._mapName);

        let collision = map.getCollisions(this._pos);

        if (type == "up" && !collision.up) {
            this._move.state = 0;
            this._move.direction = 2;
            this._pos.y -= 1;
        } else if (type == "down" && !collision.down) {
            this._move.state = 0;
            this._move.direction = 0;
            this._pos.y += 1;
        } else if (type == "left" && !collision.left) {
            this._move.state = 0;
            this._move.direction = 1;
            this._pos.x -= 1;
        } else if (type == "right" && !collision.right) {
            this._move.state = 0;
            this._move.direction = 3;
            this._pos.x += 1;
        }
    }

    update(delta) {
        if (this._move.state === -1) {
            if (Keyboard.isPress("ArrowUp"))
                this.setNextMove("up", 2);
            else if (Keyboard.isPress("ArrowDown"))
                this.setNextMove("down", 0);       
            else if (Keyboard.isPress("ArrowRight"))
                this.setNextMove("right", 3);        
            else if (Keyboard.isPress("ArrowLeft"))
                this.setNextMove("left", 1);
        }
        this.updateMove()
    }

    updateMove() {
        this._move.frame = 0;
        if (this._move.state >= this.ANIMATION_TIME) {
            this._move.frame = 0;
            this._move.offset.x = 0;
            this._move.offset.y = 0;
            this._move.state = -1;
        } else if (this._move.state >= 0) {

            this._move.frame = Math.floor(this._move.state / 3);

            if (this._move.frame > 2)
                this._move.frame %= 3;

            let pixelToMove = 64 - (64 * (this._move.state / this.ANIMATION_TIME));
            
            this._move.offset.x = 0;
            this._move.offset.y = 0;
            if(this._move.direction == 0) { // DOWN
                this._move.offset.y = -pixelToMove;
            } else if(this._move.direction == 1) { // LEFT
                this._move.offset.x = pixelToMove;
            } else if(this._move.direction == 2) { // UP
                this._move.offset.y = pixelToMove;
            } else if(this._move.direction == 3) { // RIGHT
                this._move.offset.x = -pixelToMove;
            }

            this._move.state += 1;
        }
        
    }

    get pos() {
        return this._pos;
    }

    get moveState() {
        return this._move.state;
    }

    render(ctx) {
        let tileset = loader.getSpritesheet("player");
        
        tileset.render(ctx, (this._pos.x * this.TILE_SIZE) + this._move.offset.x , (this._pos.y * this.TILE_SIZE) + this._move.offset.y, this._moves[this._move.direction][this._move.frame]);
    }
}
