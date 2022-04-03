module.exports = class Fire {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 12;
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