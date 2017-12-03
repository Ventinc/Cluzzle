import Position from './utils/Position'
import Keyboard from './Keyboard'
import Level from './Level'
import loader from './Loader'
import { loadAudio } from './utils/Utils';

export default class Game {
    constructor(name) {
        this._canvas = document.getElementById(name);
        this._ctx = this._canvas.getContext("2d");
        this._previousElapsed = 0;
        this._levels = [
            "level1",
            "level2",
            "level3"
        ]
        this._menu = {
            state: true,
            display: null
        };
        this._currentLevel = 0;
        this._level = new Level();
        this._sound = null;
    }

    init() {
        this._canvas.width = 1024;
        this._canvas.height = 1024;
        this.resizeCanvas();
        addEventListener('resize', this.resizeCanvas.bind(this), false);

        addEventListener('contextmenu', event => event.preventDefault())
    }

    resizeCanvas() {
        let windowWidth = window.innerWidth;
        this._width = windowWidth;
        this._height = window.innerHeight;
        let ratio = 1;

        if (this._height < this._width / ratio)
            this._width = this._height * ratio;
        else
            this._height = this._width / ratio;

        this._canvas.style.height = `${this._height}px`;
        this._canvas.style.width = `${this._width}px`;
        this._canvas.style.marginLeft = `${(windowWidth - this._width) / 2}px`;
        this.render(this._ctx);
    }
    

    load() {
        this._sound = loader.getSound("music");
        this._sound.setVolume(5);
        this._menu.display = loader.getSpritesheet("menu");
        this._level.load(this._levels[0], 1);        
    }

    update(delta) {
        if (this._menu.state === false) {
            this._level.update(delta);
            if (this._level.isFinish()) {
                this._currentLevel += 1;
                this._level.load(this._levels[this._currentLevel], this._currentLevel + 1);
            }
        } else if (Keyboard.isPress(" ")) {
            this._menu.state = false;
            this._sound.loop();
        }
    }

    render(ctx) {
        ctx.fillStyle = "#3399DA";
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        if (this._menu.state === false) {
            if (this._currentLevel >= this._levels.length) {
                ctx.font = "60px Bungee";
                ctx.textAlign = "center"; 
                ctx.textBaseLine = "middle"
                ctx.fillStyle = `#FFF`;
                ctx.fillText("FINISH", 1024 / 2, 1024 / 2);
            } else {
                this._level.render(ctx);
            }
        } else if (this._menu.display !== null) {
            this._menu.display.renderFullSize(ctx, 0, 0);
        }
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