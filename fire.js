module.exports = class Fire {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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