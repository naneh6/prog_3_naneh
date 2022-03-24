let LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let avlCells = this.chooseCell(0);
        let newCell = avlCells[Math.floor(Math.random() * avlCells.length)];
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            grassArr.push(newGrass);
            // matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}