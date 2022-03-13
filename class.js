class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

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


class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 12;
        this.directions = [];
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

class Burnt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 0;
    }

    revive() {
        this.energy++;
        if (this.energy >= 15) {
            for (var i in burntArr) {
                if (this.x == burntArr[i].x && this.y == burntArr[i].y) {
                    matrix[this.y][this.x] = 1;
                    burntArr.splice(i, 1);
                    grassArr.push(new Grass(this.x, this.y, 1));
                }
            }
        }
    }
}

class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 12;
        this.count = 0;
        this.innerDirections = [];
        this.innerLeftDirections = [];
        this.innerRightDirections = [];
        this.outerLeftDirections = [];
        this.outerRightDirections = [];
    }

    getNewInnerCoordinates() {
        this.innerLeftDirections = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1]
        ];

        this.innerRightDirections = [
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1]
        ];

        this.innerDirections = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getNewOuterCoordinates() {
        this.outerLeftDirections = [
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2]
        ];

        this.outerRightDirections = [
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2]
        ];
    }

    chooseOuterLeftCell(character) {
        this.getNewOuterCoordinates();
        this.getNewInnerCoordinates();
        var found = [];
        for (var i in this.outerLeftDirections) {
            var x = this.outerLeftDirections[i][0];
            var y = this.outerLeftDirections[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.outerLeftDirections[i]);
                }
            }
        }
        return found;
    }

    chooseOuterRightCell(character) {
        this.getNewOuterCoordinates();
        this.getNewInnerCoordinates();
        var found = [];
        for (var i in this.outerRightDirections) {
            var x = this.outerRightDirections[i][0];
            var y = this.outerRightDirections[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.outerRightDirections[i]);
                }
            }
        }
        return found;
    }

    chooseLeftCell(character) {
        this.getNewInnerCoordinates();
        var leftAvoid = random(this.chooseOuterLeftCell(7));
        var found = [];
        for (var i in this.innerLeftDirections) {
            var x = this.innerLeftDirections[i][0];
            var y = this.innerLeftDirections[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && !leftAvoid) {
                if (matrix[y][x] == character) {
                    found.push(this.innerLeftDirections[i]);
                }
            }
        }
        return found;
    }

    chooseRightCell(character) {
        this.getNewInnerCoordinates();
        var rightAvoid = random(this.chooseOuterRightCell(7));
        var found = [];
        for (var i in this.innerRightDirections) {
            var x = this.innerRightDirections[i][0];
            var y = this.innerRightDirections[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && !rightAvoid) {
                if (matrix[y][x] == character) {
                    found.push(this.innerRightDirections[i]);
                }
            }
        }
        return found;
    }

    chooseInnerCell(character) {
        this.getNewInnerCoordinates();
        var found = [];
        for (var i in this.innerDirections) {
            var x = this.innerDirections[i][0];
            var y = this.innerDirections[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.innerDirections[i]);
                }
            }
        }
        return found;
    }

    burn() {
        this.count++;
        var nearbyWater = random(this.chooseOuterRightCell(7));
        var otherNearbyWater = random(this.chooseOuterLeftCell(7));
        if (otherNearbyWater && nearbyWater) {
            this.energy -= 2;
        }
        else if (otherNearbyWater && !nearbyWater) {
            var newRight = random(this.innerRightDirections);
            var x = newRight[0];
            var y = newRight[1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && this.count >= 5 && matrix[newRight[1]][newRight[0]] == 1) {
                matrix[newRight[1]][newRight[0]] = 4;

                var newFire = new Fire(newRight[0], newRight[1], 4);
                fireArr.push(newFire);
                this.count = 0;
                this.energy = 12;

                for (var i in grassArr) {
                    var burntGrass = grassArr[i];
                    if (burntGrass.x == newRight[0] && burntGrass.y == newRight[1]) {
                        grassArr.splice(i, 1);
                    }
                }
            }
        }
        else if (nearbyWater && !otherNearbyWater) {
            var newLeft = random(this.innerLeftDirections);
            var x = newLeft[0];
            var y = newLeft[1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && this.count >= 5 && matrix[newLeft[1]][newLeft[0]] == 1) {
                matrix[newLeft[1]][newLeft[0]] = 4;

                var newFire = new Fire(newLeft[0], newLeft[1], 4);
                fireArr.push(newFire);
                this.count = 0;
                this.energy = 12;

                for (var i in grassArr) {
                    var burntGrass = grassArr[i];
                    if (burntGrass.x == newLeft[0] && burntGrass.y == newLeft[1]) {
                        grassArr.splice(i, 1);
                    }
                }
            }
        }
        else {
            var newCell = random(this.chooseInnerCell(1));
            if (this.count >= 5 && matrix[newCell[1]][newCell[0]] == 1) {
                matrix[newCell[1]][newCell[0]] = 4;

                var newFire = new Fire(newCell[0], newCell[1], 4);
                fireArr.push(newFire);
                this.count = 0;
                this.energy = 12;

                for (var i in grassArr) {
                    var burntGrass = grassArr[i];
                    if (burntGrass.x == newCell[0] && burntGrass.y == newCell[1]) {
                        grassArr.splice(i, 1);
                    }
                }
            }
        }
    }

    fade() {
        this.energy--;
        if (this.energy == 0) {
            for (var i in fireArr) {
                if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                    matrix[this.y][this.x] = 5;
                    fireArr.splice(i, 1);
                    burntArr.push(new Burnt(this.x, this.y, 5));
                }
            }
        }
    }
}

class Ice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
        // this.innerTop = [];
        // this.innerBottom = [];
        // this.innerLeft = [];
        // this.innerRight = [];
        // this.outerTop = [];
        // this.outerBottom = [];
        // this.outerLeft = [];
        // this.outerRight = [];
    }

    // getNewCoordinates() {
    //     this.innerTop = [
    //         [this.x-1, this.y-1],
    //         [this.x, this.y - 1],
    //         [this.x+1, this.y-1]
    //     ];
    //     this.innerBottom = [
    //         [this.x-1, this.y+1],
    //         [this.x, this.y + 1],
    //         [this.x+1, this.y+1]
    //     ];
    //     this.innerLeft = [
    //         [this.x-1, this.y-1],
    //         [this.x - 1, this.y],
    //         [this.x-1, this.y+1]
    //     ];
    //     this.innerRight = [
    //         [this.x+1, this.y-1],
    //         [this.x + 1, this.y],
    //         [this.x+1, this.y+1]
    //     ];
    //     this.outerTop = [
    //         [this.x-2, this.y-2],
    //         [this.x-1, this.y-2],
    //         [this.x, this.y - 2],
    //         [this.x+1, this.y-2],
    //         [this.x+2, this.y-2]
    //     ];
    //     this.outerBottom = [
    //         [this.x-2, this.y+2],
    //         [this.x-1, this.y+2],
    //         [this.x, this.y + 2],
    //         [this.x+1, this.y+2],
    //         [this.x+2, this.y+2]
    //     ];
    //     this.outerLeft = [
    //         [this.x-2, this.y-2],
    //         [this.x-2, this.y-1],
    //         [this.x - 2, this.y],
    //         [this.x-2, this.y+1],
    //         [this.x-2, this.y+2]
    //     ];
    //     this.outerRight = [
    //         [this.x+2, this.y-2],
    //         [this.x+2, this.y-1],
    //         [this.x + 2, this.y],
    //         [this.x+2, this.y+1],
    //         [this.x+2, this.y+2]
    //     ];
    // }

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

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    melt() {
        this.energy--;
        var nearbyFire = random(this.chooseCell(4));
        if (nearbyFire) {
            if (this.energy == 0 || fireArr == []) {
                for (var i in iceArr) {
                    if (this.x == iceArr[i].x && this.y == iceArr[i].y) {
                        matrix[this.y][this.x] = 7;
                        iceArr.splice(i, 1);
                        waterArr.push(new Water(this.x, this.y, 7));
                    }
                }
            }
        }
    }

    disappear() {
        if (grassArr == [] && eaterArr == [] && predatorArr == []) {
            if (this.energy == 0) {
                for (var i in iceArr) {
                    if (this.x == iceArr[i].x && this.y == iceArr[i].y) {
                        matrix[this.y][this.x] = 0;
                        iceArr.splice(i, 1);
                    }
                }
            }
        }
    }
}

class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
    }
    // getNewCoordinates(){
    //     this.directions = [
    //         [this.x-1, this.y-1],
    //         [this.x, this.y - 1],
    //         [this.x+1, this.y-1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x-1, this.y+1],
    //         [this.x, this.y + 1],
    //         [this.x+1, this.y+1]
    //     ];
    // }

    // chooseCell(character) {

    //     this.getNewCoordinates();

    //     var found = [];
    //     for (var i in this.directions) {
    //         var x = this.directions[i][0];
    //         var y = this.directions[i][1];
    //         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    //             if (matrix[y][x] == character) {
    //                 found.push(this.directions[i]);
    //             }

    //         }
    //     }
    //     return found;
    // }

    // stopFire() {
    //     var fire = random(this.chooseCell(4));
    //     if(fire) {
    //         for(var i in fireArr) {
    //             if(fire[0] == fireArr[i].x && fire[1] == fireArr[i].y) {  
    //                 matrix[fire[1]][fire[0]] = 5;  
    //                 fireArr.splice(i, 1);
    //                 burntArr.push(new Burnt(fire[0], fire[1], 5));
    //             }
    //         }
    //         this.energy++;
    //     }
    //     else {
    //         this.energy--;
    //     }
    // }
    freeze() {
        this.energy--;
        if (this.energy == 0) {
            for (var i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    matrix[this.y][this.x] = 6;
                    waterArr.splice(i, 1);
                    iceArr.push(new Ice(this.x, this.y, 6));
                }
            }
        }
    }
}