export default class Position{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }

    set(value) {
        if (value !== undefined) {
            if (value.x !== undefined)
                this.x = value.x
            if (value.y !== undefined)
                this.y = value.y
        }
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    set x(value) {
        this._x = value
    }

    set y(value) {
        this._y = value
    }
    
    toObject() {
        return {x: this._x, y: this._y};
    }
}
