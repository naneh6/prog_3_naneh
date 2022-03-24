import { rejects } from "assert";

var socket = io();

side = 30;

function setup() {
    createCanvas(7 * side, 13 * side);
    background("#acacac");
}

function drawMatrix(matrix) {
    console.log(matrix);

    for(var y = 0; y < matrix.length; y++) {
        for(var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];
            if(obj == 0) {
                fill("#acacac");
            }
            else if(obj == 1) {
                fill("#3bed47");
            }
            else if(obj == 2) {
                fill("#f74ce6");
            }
            else if(obj == 3) {
                fill("#db2727");
            }
            else if(obj == 4) {
                fill("#f28510");
            }
            else if(obj == 5) {
                fill("#eae42a");
            }
            else if(obj == 6) {
                fill("#c4f3ff");
            }
            else if(obj == 7) {
                fill("#0f7be0");
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