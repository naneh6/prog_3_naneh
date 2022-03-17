import LivingCreature from './creature.js'

class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
        }
    }

    eat() {
        var newCell = random(this.chooseCell(1));
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
        var newCell = random(this.chooseCell(0));
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