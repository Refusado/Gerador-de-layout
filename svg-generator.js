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

function generateRects(n) {
    rounds++;
    allRects = [];
    let firstRound = true;

    for (let i = 0; i < n;) {
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

        firstRound = false;
        allRects.push(new Rect(randX, randY, randW, randH));
        i++;
    }
}

function drawElements(arr) {
    let rectsToClear = Array.from(document.querySelectorAll('.shape'));
    rectsToClear.map((elem) => { svgContainer.removeChild(elem); });

    for (const rect of arr) {
        const elem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        
        elem.setAttribute('x', rect.pX);
        elem.setAttribute('y', rect.pY);
        elem.setAttribute('width', rect.width);
        elem.setAttribute('height', rect.height);
        
        elem.classList.add('shape');
        svgContainer.appendChild(elem);
    }
}

function getCenterOfMass(arr) {
    const allMass = [];
    const allMassPosX = [];
    const allMassPosY = [];

    for (const rect of arr) {
        const mass = rect.width * rect.height;
        const posX = rect.pX + (rect.width / 2);
        const posY = rect.pY + (rect.height / 2);

        allMass.push(mass);
        allMassPosX.push(mass * posX);
        allMassPosY.push(mass * posY);
    }

    const totalMass = allMass.reduce((acc, curr) => acc + curr);
    const totalMassPosX = allMassPosX.reduce((acc, curr) => acc + curr);
    const totalMassPosY = allMassPosY.reduce((acc, curr) => acc + curr);

    const xCM = Math.floor(totalMassPosX / totalMass);
    const yCM = Math.floor(totalMassPosY / totalMass);

    return { 'x': xCM, 'y': yCM };
}

const svgContainer = document.getElementById('svg-container');

var rounds = 0;
function centerShapes() {
    generateRects(8);
    let CM = getCenterOfMass(allRects);
    
    while (CM.x !== 300 || CM.y !== 300) {
        generateRects(8);
        CM = getCenterOfMass(allRects);
    }

    drawElements(allRects);
    console.info(rounds);
    rounds = 0;
}

svgContainer.addEventListener('click', centerShapes);

// GERAR UM NÚMERO ALEATÓRIO MÚLTIPLO DE UM DADO VALOR
function randomMultiple(min, max, multiple) {
    let result = Math.floor((Math.random() * (max - min) + min));
    while (result % multiple != 0) {
        result = Math.floor((Math.random() * (max - min) + min));
    }
    return result;
}