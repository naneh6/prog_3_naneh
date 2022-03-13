
var matrix = []; // Մատրիցի ստեղծում
var side = 10;
var grassArr = [];
var eaterArr = [];
var predatorArr = [];
var fireArr = [];
var burntArr = [];
var iceArr = [];
var waterArr = [];

function setup() {
    frameRate(5);

var rows = 80; // Տողերի քանակ
var columns = 80; // Սյուների քանակ
    
for (var y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (var x = 0; x < columns; x++) {
        var a = Math.floor(Math.random() * 80);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2; // Մատրիցի 20 տոկոսը կլինի 2
        }
        else if (a >= 50 && a < 60) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 60 && a < 70) {
            matrix[y][x] = 4; // Մատրիցի 10 տոկոսը կլինի 4
        }
        else if (a >= 70 && a < 80) {
            matrix[y][x] = 6; // Մատրիցի 10 տոկոսը կլինի 6
        }
    }
}

     // matrix = [
     //     [1, 2, 0, 1, 0],
     //     [1, 1, 0, 1, 0],
     //     [1, 1, 1, 0, 1],
     //     [1, 0, 1, 1, 1],
     //     [0, 0, 1, 4, 1],
     //     [1, 0, 1, 0, 1],
     //     [1, 7, 1, 1, 1]
     // ];

    createCanvas(matrix[0].length * side, matrix.length * side);
    background("#acacac");

    for(var y = 0; y < matrix.length; y++) {
        for(var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            }
            else if(matrix[y][x] == 2) {
                eaterArr.push(new GrassEater(x, y));
            }
            else if(matrix[y][x] == 3) {
                predatorArr.push(new Predator(x, y));
            }
            else if(matrix[y][x] == 4) {
                fireArr.push(new Fire(x, y));
                //how to make a new array for each Fire, so that the next Fire-s will be that arrays' i items; that'll allow to splice the first items of Fires when the length reaches a certain amount
            }
            else if(matrix[y][x] == 5) {
                burntArr.push(new Burnt(x, y));
            }
            else if(matrix[y][x] == 6) {
                iceArr.push(new Ice(x, y));
            }
            else if(matrix[y][x] == 7) {
                waterArr.push(new Water(x, y));
            }
        }
    }
}


function draw() {
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
            //iceArr[i].disappear();
        }
        for(var i in waterArr) {
            waterArr[i].freeze();
        }
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                fill("#3bed47");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("#f74ce6");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 3) {
                fill("#db2727");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 4) {
                fill("#f28510");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 5) {
                fill("#eae42a");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 6) {
                fill("#c4f3ff");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 7) {
                fill("#0f7be0");
                rect(x * side, y * side, side, side);                
            }
        }
    }
}