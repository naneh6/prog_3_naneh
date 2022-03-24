class Ice extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
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
        return super.chooseCell(character);
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