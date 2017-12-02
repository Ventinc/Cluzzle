import Position from 'utils/Position'
import Vector from 'utils/Vector'

export class Player {
    constructor() {
        this._pos = new Position();
        this._vector = new Vector();
    }

    init(position) {
        this._pos.set(position);
    }
}