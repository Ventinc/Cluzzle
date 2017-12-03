export function loadJson(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
                else
                    reject(`Can't load json named ${url}`);
            }
        }
        xhr.send(null);
    });
}

export function loadImage(src) {
    return new Promise((resolve, reject) => {
       let img = new Image();
       img.onload = () => {
           resolve(img);
       }
       img.onerror = () => {
           reject(`Can't load this image ${src}`);
       }
       img.src = src
    });
}

export function loadAudio(src) {
    return new Promise((resolve, reject) => {
        let audio = new Audio();
        audio.onloadeddata = () => {
            resolve(audio);
        }
        audio.onerror = () => {
            reject(`Can't load this sound ${src}`)
        }
        audio.src = src;
        audio.load();
    });
}

export default {loadJson, loadImage}