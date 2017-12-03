import { loadAudio } from "./utils/Utils";

export default class Sound {
    constructor() {
        this._sound = null;
    }

    async load(name) {
        this._sound = await loadAudio(`./assets/sounds/${name}.ogg`);
        return true; 
    }

    play() {
        //this._sound.play();
    }

    loop() {
        this._sound.loop = true;
        this.play();
    }

    setVolume(level) {
        this._sound.volume = level / 100;
    }
}