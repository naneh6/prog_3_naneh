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