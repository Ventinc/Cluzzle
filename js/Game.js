import Position from './utils/Position'

export default class Game {
    constructor(name) {
        this._canvas = document.getElementById(name);
        this._ctx = this._canvas.getContext("2d");
        this._previousElapsed = 0;
        this._mousepos = new Position(0, 0);
    }

    init() {
        this._canvas.width = 1000;
        this._canvas.height = 1000;
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
        this.render();
    }

    load() {

    }

    update(delta) {

    }

    render() {
        this.fillStyle = "#000";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    run() {
        this.init();
        window.requestAnimationFrame(this.tick.bind(this))
    }

    tick(elapsed) {
        window.requestAnimationFrame(this.tick.bind(this));

        let delta = (elapsed - this._previousElapsed) / 1000;
        delta = Math.min(delta, 0.25);
        this._previousElapsed = elapsed;

        this.update(delta);
        this.render()
    }
}