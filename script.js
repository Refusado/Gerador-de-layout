function testo () {
    let loops = 0;
    let x = 8;

    for (let i = 0; i < x; i++) {
        loops++;
        let value = Math.floor((Math.random() * 600 + 1));

        if (value !== 1) {
            i--;
            continue ;
        }
    }
    console.info(loops);
}

function Rect(pX, pY, width, height) {
    this.pX = pX,
    this.pY = pY,
    this.width = width,
    this.height = height,
    this.eX = this.pX + this.width,
    this.eY = this.pY + this.height
}

const allRects = [];

let rounds = 0;
let firstRound = true;

for (let i = 0; i < 6; i++) {
    rounds++;
    let randW = randomMultiple(10, 200, 40);
    let randH = randomMultiple(10, 200, 40);
    
    let randX = randomMultiple(10, 600, 40);
    let randY = randomMultiple(10, 600, 40);
    
    let endX    = randX + randW;
    let endY    = randY + randH;
    
    if (endX > 600 || endY > 600) {
        i--;
        continue;
    }


    function randomMultiple(min, max, multiple) {
        let result = Math.floor((Math.random() * (max - min) + min));
        while (result % multiple != 0) {
            result = Math.floor((Math.random() * (max - min) + min));
        }
        return result;
    }

    
    
    let colision = false;
    if (!firstRound) {
        for (let ii = 0; ii < allRects.length; ii++) {
            if (
                randX   > allRects[ii].pX && randX  < allRects[ii].eX ||
                endX    > allRects[ii].pX && endX   < allRects[ii].eX ||
                randX   < allRects[ii].pX && endX   > allRects[ii].pX ||
                randX   < allRects[ii].eX && endX   > allRects[ii].eX ||
                randX   == allRects[ii].pX || endX  == allRects[ii].eX 
                ) {
                if (
                    randY   > allRects[ii].pY && randY  < allRects[ii].eY ||
                    endY    > allRects[ii].pY && endY   < allRects[ii].eY ||
                    randY   < allRects[ii].pY && endY   > allRects[ii].pY ||
                    randY   < allRects[ii].eY && endY   > allRects[ii].eY ||
                    randY   == allRects[ii].pY || endY  == allRects[ii].eY
                ) {
                        colision = true;
                }
            }
        }
    }
    
    if (colision) {
        i--;
        continue;
    }
    
    firstRound = false;
    const newRect = new Rect(randX, randY, randW, randH);
    allRects.push(newRect);
}

console.info(rounds);
// console.info(allRects);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(290, 290, 10, 10);

for (const rect of allRects) {
    ctx.fillStyle = '#00000044';
    ctx.fillRect(rect.pX, rect.pY, rect.width, rect.height);
}