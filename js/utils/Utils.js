export function loadJson(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText))
                else
                    reject(`Can't load json named ${url}`)
            }
        }
        xhr.send(null)
    })
}

export default {loadJson}