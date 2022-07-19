const canvas = document.getElementById('canvas');

// SISTEMA PARA SÓ EXECUTAR A FUNÇÃO DEPOIS DE UM CERTO TEMPO SEM UM CLICK
let timer;
canvas.addEventListener('click', () => {
    generateRects();

    clearTimeout(timer);
    timer = setTimeout(() => clearAllRects(), 3000);
});

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

let allRects = [];

function generateRects() {
    clearAllRects();

    allRects = [];
    let rounds = 0;
    let firstRound = true;

    for (let i = 0; i < 4;) {
        rounds++;
        let randW = randomMultiple(10, 200, 80);
        let randH = randomMultiple(10, 200, 80);
        let randX = randomMultiple(0, (620 - randW), 40);
        let randY = randomMultiple(0, (620 - randH), 40);
        let endX  = randX + randW;
        let endY  = randY + randH;
        
        if (endX > 620 || endY > 620) continue;
        
        // SISTEMA PARA SEMPRE QUE HOUVER SOBREPOSIÇÕES O LOOP ATUAL SER REFEITO
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

const ctx = canvas.getContext('2d');

function drawRects() {
    for (const rect of allRects) {
        ctx.fillStyle = '#00000044';
        ctx.fillRect(rect.pX, rect.pY, rect.width, rect.height);
        ctx.strokeRect(rect.pX, rect.pY, rect.width, rect.height);
    }
}

function clearAllRects() {
    for (const rect of allRects) {
        ctx.clearRect(rect.pX, rect.pY, rect.width, rect.height);
    }
}

// GERAR UM NÚMERO ALEATÓRIO MÚLTIPLO DE UM DADO NÚMERO
function randomMultiple(min, max, multiple) {
    let result = Math.floor((Math.random() * (max - min) + min));
    while (result % multiple != 0) {
        result = Math.floor((Math.random() * (max - min) + min));
    }
    return result;
}