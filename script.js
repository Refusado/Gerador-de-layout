// GERAR UM NÚMERO ALEATÓRIO SE BASEANDO EM UM MÚLTIPLO 
function randomMultiple(min, max, multiple) {
    let result = Math.floor((Math.random() * (max - min) + min));
    while (result % multiple != 0) {
        result = Math.floor((Math.random() * (max - min) + min));
    }
    return result;
}

class Rect {
    constructor(pX, pY, width, height) {
        this.pX = pX,
        this.pY = pY,
        this.width = width,
        this.height = height,
        this.eX = this.pX + this.width,
        this.eY = this.pY + this.height
    }
}

const canvas = document.getElementById('canvas');
const mainContainer = document.getElementById('container');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(290, 290, 10, 10);

canvas.onclick = generateRects;
mainContainer.ondblclick = clearAllRects;


let allRects = [];

function generateRects() {
    clearAllRects();
    allRects = [];
    let firstRound = true;
    let rounds = 0;

    for (let i = 0; i < 4;) {
        rounds++;
        let randW = randomMultiple(10, 200, 80);
        let randH = randomMultiple(10, 200, 80);
        let randX = randomMultiple(0, (620 - randW), 40);
        let randY = randomMultiple(0, (620 - randH), 40);
        let endX  = randX + randW;
        let endY  = randY + randH;
        
        if (endX > 620 || endY > 620) continue;
        
        let colision = false;
        if (!firstRound) {
            for (let ii = 0; ii < allRects.length; ii++) {
                if (
                    randX   > allRects[ii].pX && randX  < allRects[ii].eX ||
                    endX    > allRects[ii].pX && endX   < allRects[ii].eX ||
                    randX   < allRects[ii].pX && endX   > allRects[ii].pX ||
                    randX   < allRects[ii].eX && endX   > allRects[ii].eX ||
                    randX  == allRects[ii].pX || endX  == allRects[ii].eX
                ) {
                    if (
                        randY   > allRects[ii].pY && randY  < allRects[ii].eY ||
                        endY    > allRects[ii].pY && endY   < allRects[ii].eY ||
                        randY   < allRects[ii].pY && endY   > allRects[ii].pY ||
                        randY   < allRects[ii].eY && endY   > allRects[ii].eY ||
                        randY  == allRects[ii].pY || endY  == allRects[ii].eY
                    ) {
                            colision = true;
                            break;
                    }
                }
            }
        }
        
        if (colision) continue;
        
        allRects.push(new Rect(randX, randY, randW, randH));
        firstRound = false;
        i++;
    }
    drawRects();
    // console.info(rounds);
}
function clearAllRects() {
    for (const rect of allRects) {
        ctx.clearRect(rect.pX, rect.pY, rect.width, rect.height);
    }
}

function drawRects() {
    for (const rect of allRects) {
        ctx.fillStyle = '#00000044';
        ctx.fillRect(rect.pX, rect.pY, rect.width, rect.height);
        ctx.strokeRect(rect.pX, rect.pY, rect.width, rect.height);
    }
}