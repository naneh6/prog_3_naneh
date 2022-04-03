var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

matrix = [];

grassArr = [];
eaterArr = [];
predatorArr = [];
fireArr = [];
burntArr = [];
iceArr = [];
waterArr = [];

wth = "spring";

Grass = require("./grass");
GrassEater = require("./grasseater");
Predator = require("./predator");
Fire = require("./fire");
Burnt = require("./burnt");
Ice = require("./ice");
Water = require("./water");

function generateMatrix(side) {
    let matrix = []
    for (var y = 0; y < side; y++) {
        matrix[y] = [];
        for (var x = 0; x < side; x++) {
            var a = Math.floor(Math.random() * 80);
            if (a >= 0 && a < 20) {
                matrix[y][x] = 0;
            }
            if (a >= 20 && a < 35) {
                matrix[y][x] = 1;
            }
            else if (a >= 35 && a < 50) {
                matrix[y][x] = 2;
            }
            else if (a >= 50 && a < 60) {
                matrix[y][x] = 3;
            }
            else if (a >= 60 && a < 70) {
                matrix[y][x] = 4;
            }
            else if (a >= 70 && a < 80) {
                matrix[y][x] = 6;
            }
        }
    }
    return matrix;
}
matrix = generateMatrix(40)
io.sockets.emit('update', matrix);

function createObj(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            }
            else if (matrix[y][x] == 2) {
                eaterArr.push(new GrassEater(x, y, 2));
            }
            else if (matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y, 3));
            }
            else if (matrix[y][x] == 4) {
                fireArr.push(new Fire(x, y, 4));
            }
            else if (matrix[y][x] == 5) {
                burntArr.push(new Burnt(x, y, 5));
            }
            else if (matrix[y][x] == 6) {
                iceArr.push(new Ice(x, y, 6));
            }
            else if (matrix[y][x] == 7) {
                waterArr.push(new Water(x, y, 7));
            }
        }
    }
    io.sockets.emit('update', matrix);
}

function play() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in eaterArr) {
        eaterArr[i].eat();
        eaterArr[i].mul();
        eaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }

    for (var i in fireArr) {
        fireArr[i].fade();
    }

    for (var i in burntArr) {
        burntArr[i].revive();
    }
    for (var i in iceArr) {
        iceArr[i].melt();
    }
    for (var i in waterArr) {
        waterArr[i].freeze();
    }

    io.sockets.emit("update", matrix);
}

setInterval(play, 1000);

function spring() {
    for (var elem in iceArr) {
        x = iceArr[elem].x;
        y = iceArr[elem].y;
        matrix[y][x] = 7;
        //console.log("melting the ice");
        iceArr.splice(elem, 1);
        waterArr.push(new Water(x, y, 7));
    }
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 7;
            // console.log("adding water");
            waterArr.push(new Water(x, y, 7));
        }
    }
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            // console.log("adding grass");
            grassArr.push(new Grass(x, y, 1));
        }
    }
    for (var elem in burntArr) {
        burntArr[elem].revive();
    }
    io.sockets.emit("update", matrix);
}

function summer() {
    // console.log("add predators, grass eater, fire");
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y, 3));
        }
    }
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            eaterArr.push(new GrassEater(x, y, 2));
        }
    }
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 1) {
            for (var elem in grassArr) {
                if (x == grassArr[elem].x && y == grassArr[elem].y) {
                    matrix[y][x] = 4;
                    grassArr.splice(elem, 1);
                    fireArr.push(new Fire(x, y, 4));
                }
            }
        }
    }
    io.sockets.emit("update", matrix);
}

function autumn() {
    // console.log("splicing some grass");
    for (var i = 0; i < 15; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 1) {
            for (var elem in grassArr) {
                if (x == grassArr[elem].x && y == grassArr[elem].y) {
                    matrix[y][x] = 0;
                    grassArr.splice(elem, 1);
                }
            }
        }
    }
    io.sockets.emit("update", matrix);
}

function winter() {
    // console.log("freeze water, splice predators, cut fire");
    for (var elem in waterArr) {
        x = waterArr[elem].x;
        y = waterArr[elem].y;
        matrix[y][x] = 6;
        waterArr.splice(elem, 1);
        iceArr.push(new Ice(x, y, 6));
    }
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length);
        var y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 3) {
            for (var elem in predatorArr) {
                if (x == predatorArr[elem].x && y == predatorArr[elem].y) {
                    matrix[y][x] = 0;
                    predatorArr.splice(elem, 1);
                }
            }
        }
    }
    for (var elem in fireArr) {
        x = fireArr[elem].x;
        y = fireArr[elem].y;
        matrix[y][x] = 0;
    }
    fireArr = [];
    io.sockets.emit("update", matrix);
}

function spliceIce() {
    // if (grassArr.length == 0 && eaterArr.length == 0 && predatorArr.length == 0) {
    for (var elem in iceArr) {
        x = iceArr[elem].x;
        y = iceArr[elem].y;
        matrix[y][x] = 0;
        //iceArr.splice(elem, 1);
    }
    iceArr = [];
    console.log("split ice");
    //}
    io.sockets.emit("update", matrix);
}

function last() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
        }
    }
    grassArr = [];
    eaterArr = [];
    predatorArr = [];
    fireArr = [];
    burntArr = [];
    iceArr = [];
    waterArr = [];
    io.sockets.emit("update", matrix);
}

function renaissance() {
    matrix = generateMatrix(40);
    createObj(matrix);
    io.sockets.emit('update', matrix);
}

io.on('connection', function (socket) {
    createObj(matrix);
    socket.on("spring", spring);
    socket.on("summer", summer);
    socket.on("autumn", autumn);
    socket.on("winter", winter);
    socket.on("splice", spliceIce);
    socket.on("last", last);
    socket.on("renaissance", renaissance);
})