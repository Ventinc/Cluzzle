let json = require(process.argv[2]);

data = json.layers[0].data

let group = [];

n = 16

for (var i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0)
        j++;
    group[j] = group[j] || [];
    group[j].push(data[i])
}

let ret = {"data": group};

console.log(JSON.stringify(ret));
