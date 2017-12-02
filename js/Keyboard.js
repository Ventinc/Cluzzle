class Keyboard {

    constructor() {
        this._keys = [];
        this.init();
    }

    init() {
        addEventListener('keydown', this.onKeyDown.bind(this), false);
        addEventListener('keyup', this.onKeyUp.bind(this), false);
    }
    
    onKeyDown(event) {
        this._keys[event.key] = true;
    }

    onKeyUp(event) {
        this._keys[event.key] = false;
    }

    isPress(key) {
        return this._keys[key] !== null && this._keys[key] === true;
    }
}

const keyboard = new Keyboard();

export default keyboard;