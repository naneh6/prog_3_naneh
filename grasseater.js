let LivingCreature = require('./creature');

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    move() {
        var avlCells = this.chooseCell(0);
        var newCell = avlCells[Math.floor(Math.random() * avlCells.length)];
        if (newCell) {
            console.log('okokokok')
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
        }
    }

    eat() {
        var grCells = this.chooseCell(1);
        var newCell = grCells[Math.floor(Math.random() * grCells.length)];
        if (newCell) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;

            this.x = newCell[0];
            this.y = newCell[1];

            for (var i in grassArr) {
                var gr = grassArr[i];
                if (gr.x == newCell[0] && gr.y == newCell[1]) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        var avlCells = this.chooseCell(0);
        var newCell = avlCells[Math.floor(Math.random() * avlCells.length)];
        if (this.energy >= 14 && newCell) {
            var newEater = new GrassEater(newCell[0], newCell[1]);
            eaterArr.push(newEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }

    die() {
        if (this.energy == 0) {
            for (var i in eaterArr) {
                if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                    matrix[this.y][this.x] = 0;
                    eaterArr.splice(i, 1);
                }
            }
        }
    }
}