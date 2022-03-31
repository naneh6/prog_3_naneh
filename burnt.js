module.exports = class Burnt {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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