var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [];

function generateMatrix(side) {
    for (var y = 0; y < side; y++) {
        matrix[y] = [];
        for (var x = 0; x < side; x++) {
            var a = Math.floor(Math.random() * 80);
            if (a >= 0 && a < 20) {
                matrix[y][x] = 0;
            }
            if (a >= 20 && a < 40) {
                matrix[y][x] = 1;
            }
            else if (a >= 40 && a < 50) {
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
}

io.sockets.emit('update', generateMatrix(side));


grassArr = [];
eaterArr = [];
predatorArr = [];
fireArr = [];
burntArr = [];
iceArr = [];
waterArr = [];

Grass = require("./Grass");
GrassEater = require("./GrassEater");
// ...

function createObj(matrix) {
    // ...
}

function play() {
    for(var i in grassArr){
        grassArr[i].mul();
    }
    for(var i in eaterArr){
        eaterArr[i].eat();
        eaterArr[i].mul();
        eaterArr[i].die();
    }
    for(var i in predatorArr){
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }

    for(var i in fireArr) {
        // fireArr[i].burn();
        fireArr[i].fade();
    }
    
    for(var i in burntArr) {
        burntArr[i].revive();
    }
    for(var i in iceArr) {
        iceArr[i].melt();
        iceArr[i].disappear();
    }
    for(var i in waterArr) {
        waterArr[i].freeze();
    }

    io.on('update', matrix);
}

setInterval(play, 1000);

io.on('connection', function(socket) {
    createObj(matrix);
})