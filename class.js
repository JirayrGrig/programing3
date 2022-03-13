class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
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
    chooseCell(char) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
}






class Grass extends LivingCreature {


    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        let found1 = this.chooseCell(4);
        let exact1 = random(found1)


        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        }
        else if (exact1 && this.energy > 8) {
            let x = exact1[0];
            let y = exact1[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        }


        else {
            console.error('there is no way to multiply');
        }
    }
}


class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 20
    }
    getNewCordinates() {
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

    chooseCell(char) {
        this.getNewCordinates();
        return super.chooseCell(char)
    }

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 20;
        } else {
            console.error('there is no way to multiply');
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = random(found)


        let found3 = this.chooseCell(3);
        let exact3 = random(found3)

        if (exact) {
            this.energy += 2;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y
            if (this.energy > 30) {
                this.mul()
            }
            else {
                this.move()
            }
        }

        else if (exact3) {
            this.energy += 5;
            let x = exact3[0];
            let y = exact3[1];

            for (let i = 0; i < flowersArr.length; i++) {
                if (flowersArr[i].x == x && flowersArr[i].y == y) {
                    flowersArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y
            if (this.energy > 230) {
                this.mul()
            }
            else {
                this.move()
            }

        }




    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class Flowers extends LivingCreature{


    /*Բազմանւմ է դատարկ վանդակների վրա*/

   
    getNewCordinates() {
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
    chooseCell(char) {
        this.getNewCordinates();
        return super.chooseCell(char)
    
    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let flower = new Flowers(x, y);
            matrix[y][x] = 3;
            flowersArr.push(flower);

            this.energy = 5;
        } else {
            console.error('there is no way to multiply');
        }
    }
    die() {
        for (let i = 0; i < flowersArr.length; i++) {
            if (flowersArr[i].x == this.x && flowersArr[i].y == this.y) {
                flowersArr.splice(i, 3)
            }
        }
        matrix[this.y][this.x] = 0
    }
}

class Water {

    /*Սպանում է ծաղիկներին(3),խոտին(1),խոտակերին(2):
    Բազմանում է դատարկ վանդակների(0) վրա:*/

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 75;
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

    getNewCordinates() {
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


    chooseCell(char) {
        this.getNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }


    chooseCell(char) {
        this.getNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)



        if (exact && this.energy > 20) {
            let x = exact[0];
            let y = exact[1];

            let wat = new Water(x, y);
            matrix[y][x] = 4;
            waterArr.push(wat);

            this.energy = 100;
        }


        else {
            console.error('there is no way to multiply 4');
        }
    }

    eat() {
        let found1 = this.chooseCell(1);
        let exact1 = random(found1);


        let found3 = this.chooseCell(3);
        let exact3 = random(found3);

        let found4 = this.chooseCell(2);
        let exact4 = random(found4);


        if (exact1) {
            let x = exact1[0];
            let y = exact1[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            this.mul()
            this.mul()
            this.die()

        }



        else if (exact3) {
            let x = exact3[0];
            let y = exact3[1];

            for (let i = 0; i < flowersArr.length; i++) {
                if (flowersArr[i].x == x && flowersArr[i].y == y) {
                    mardArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            this.mul()
            this.mul()
            this.die()

        }

        else if (exact4) {
            let x = exact4[0];
            let y = exact4[1];

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            matrix[y][x] = 4
            this.mul()
            this.mul()
            this.die()

        }
    }

    die() {
        for (let i = 0; i < waterArr.length; i++) {
            if (waterArr[i].x == this.x && waterArr[i].y == this.y) {
                waterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}