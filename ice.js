let LivingCreature = require('./creature');

module.exports = class Ice extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
    }

    melt() {
        this.energy--;
        var avlFire = this.chooseCell(4);
        var nearbyFire = avlFire[Math.floor(Math.random() * avlFire.length)];
        if (nearbyFire) {
            if (this.energy == 0 || fireArr.length == 0) {
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

    // disappear() {
    //     if (grassArr.length == 0 && eaterArr.length == 0 && predatorArr.length == 0) {
    //         if (this.energy == 0) {
    //             for (var i in iceArr) {
    //                 if (this.x == iceArr[i].x && this.y == iceArr[i].y) {
    //                     matrix[this.y][this.x] = 0;
    //                     iceArr.splice(i, 1);
    //                 }
    //             }
    //         }
    //     }
    // }
}