import Position from './utils/Position'
import Keyboard from './Keyboard'
import Level from './Level'
import loader from './Loader'

export default class Game {
    constructor(name) {
        this._canvas = document.getElementById(name);
        this._ctx = this._canvas.getContext("2d");
        this._previousElapsed = 0;
        this._levels = [
            "test"
        ]
        this._level = new Level();
    }

    init() {
        this._canvas.width = 1024;
        this._canvas.height = 1024;
        this.resizeCanvas();
        addEventListener('resize', this.resizeCanvas.bind(this), false);

        addEventListener('contextmenu', event => event.preventDefault())
    }

    resizeCanvas() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        let ratio = 1;

        if (this._height < this._width / ratio)
            this._width = this._height * ratio;
        else
            this._height = this._width / ratio;

        this._canvas.style.height = `${this._height}px`;
        this._canvas.style.width = `${this._width}px`;
        this.render(this._ctx);
    }

    load() {
        this._level.load(this._levels[0]);        
    }

    update(delta) { 
        this._level.update(delta);
    }

    render(ctx) {
        ctx.fillStyle = "#596A6C";
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._level.render(ctx);
    }

    run() {
        this.init();
        loader.load().then(() => {
            this.load();
            window.requestAnimationFrame(this.tick.bind(this));
        }).catch(e => console.error(e));
    }

    tick(elapsed) {
        window.requestAnimationFrame(this.tick.bind(this));

        let delta = (elapsed - this._previousElapsed) / 1000;
        delta = Math.min(delta, 0.25);
        this._previousElapsed = elapsed;

        this.update(delta);
        this.render(this._ctx);
    }
}