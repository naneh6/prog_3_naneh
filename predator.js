class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 12;
        this.directions = [];
    }

    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy -= 2;
        }
        else {
            this.energy -= 2;
        }
    }

    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;

            this.x = newCell[0];
            this.y = newCell[1];

            for (var i in eaterArr) {
                var eater = eaterArr[i];
                if (eater.x == newCell[0] && eater.y == newCell[1]) {
                    eaterArr.splice(i, 1);
                }
            }
        }
        else {
            this.move();
        }
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 18 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], 3);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 12;
        }
    }

    die() {
        if (this.energy == 0) {
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    matrix[this.y][this.x] = 0;
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}