import Map from './Map'
import Player from './Player'
import loader from './Loader'

export default class Level {
    constructor() {
        this.ANIMATION_LENGTH = 80;
        this._map = null;
        this._players = [];
        this._level = 0;
        this._levelAnimationState = -1;
    }

    load(name, level) {
        this._map = loader.getMap(name);
        this._players = [];
        if (this._map !== undefined && this._map !== null) {
            this._players = this._map.spawns.map(pos => {
                return new Player(pos, name);
            })
        }
        this._level = level;
        this._levelAnimationState = 0;
    }

    update(delta) {
        this._players.forEach(player => player.update(delta));
    }

    isFinish() {
        let countFinish = 0;
        if (this._map !== null && this._map !== undefined && this._players.length > 0) {
            this._map.ends.forEach(elem => {
                this._players.forEach(player => {
                    if (player.moveState == -1 && elem.x == player.pos.x && elem.y == player.pos.y)
                        countFinish += 1;
                })
            })
        }
        return countFinish >= this._players.length;
    }

    render(ctx) {
        if (this._map !== null && this._map !== undefined)
            this._map.render(ctx);
        this._players.forEach(elem => {
            elem.render(ctx);
        })
        if (this._levelAnimationState !== -1) {
            let name = `Level ${this._level}`;
            let opacity = 1 - (this._levelAnimationState / this.ANIMATION_LENGTH);
            ctx.font = "60px Bungee";
            ctx.textAlign = "center"; 
            ctx.textBaseLine = "middle"
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillText(name, 1024 / 2, 1024 / 2);
            this._levelAnimationState += 1;
            if (this._levelAnimationState > this.ANIMATION_LENGTH)
                this._levelAnimationState = -1;
        }
    }
}