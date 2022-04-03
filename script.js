var socket = io();

var side = 30;

function setup() {
    createCanvas(20 * side, 20 * side);
    background("#acacac");
}

function drawMatrix(matrix) {
    for(var y = 0; y < matrix.length; y++) {
        for(var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];
            if(obj == 0) {
                fill("#acacac");
            }
            else if(obj == 1) {
                fill("#3bed47"); // green, grass
            }
            else if(obj == 2) {
                fill("#f74ce6"); // purple, grasseater
            }
            else if(obj == 3) {
                fill("#db2727"); // red, predator
            }
            else if(obj == 4) {
                fill("#f28510"); // orange, fire
            }
            else if(obj == 5) {
                fill("#eae42a"); // yellow, burnt
            }
            else if(obj == 6) {
                fill("#c4f3ff"); // light blue, ice
            }
            else if(obj == 7) {
                fill("#0f7be0"); // blue, water
            }
            rect(x * side, y * side, side, side);
        }
    }
}



setInterval(
    function() {
        socket.on('update', drawMatrix)
    }, 1000
)


function spring() {
    socket.emit("spring");
}
function summer() {
    socket.emit("summer");
}
function autumn() {
    socket.emit("autumn");
}
function winter() {
    socket.emit("winter");
}
function spliceIce() {
    socket.emit("splice");
}
function last() {
    socket.emit("last");
}
function renaissance() {
    socket.emit("renaissance");
}