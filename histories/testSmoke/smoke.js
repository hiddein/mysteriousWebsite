// Настройки анимации дымка
// Параметры канваса
// canvasWidth = 1600;
// canvasHeight = 800;
// Число частиц в одной сцене
var particlesPerPuff = 1200;
// Задержка между появлением соседних частиц (мс.)
var particleDelay = 50;
// Картинка для отображения одной частицы 
var img = '/img/smoke_part.png';

pCollection = new Array();
var smokeImage = new Image();
smokeImage.src = img;
var c = document.getElementById("smokeCanvas");

// Генерация частиц для сцены
pCount = 0;
var beginTime = new Date().getTime()
for (var i2 = 0; i2 < particlesPerPuff; i2++) {
    pCollection[pCount++] = newParticle(i2 * particleDelay + beginTime);
}


draw()

function newParticle(delay) {

    var p = {};
    p.top = c.height;
    p.left = randBetween(-200, c.width);

    p.start = delay;
    p.life = 8000;
    p.speedUp = 40; //30

    p.speedRight = randBetween(0, 20);

    p.rot = randBetween(-1, 1);
    p.red = Math.floor(randBetween(0, 255));
    p.blue = Math.floor(randBetween(0, 255));
    p.green = Math.floor(randBetween(0, 255));

    p.startOpacity = .09
    p.newTop = p.top;
    p.newLeft = p.left;
    p.size = 200;
    p.growth = 20;

    return p;

}

function draw() {
    //Grab and clear the canvas
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = c.width;

    //Loop through particles
    for (var i = 0; i < pCount; i++) {
        //Grab the particle
        var p = pCollection[i];

        //Timing
        var td = new Date().getTime() - p.start;
        var frac = td / p.life

        if (td > 0) {
            /// Если частица "умерла", то генерируем ей замену
            if ( td > p.life ) {
                // Новое время появления частицы = старое время появления + длительность сцены
                pCollection[i] = newParticle( (particlesPerPuff - 1) * particleDelay + pCollection[i].start ); 
                continue;
            }

            //attributes that change over time
            var newTop = p.top - (p.speedUp * (td / 1000));
            var newLeft = p.left + (p.speedRight * (td / 1000));
            var newOpacity = Math.max(p.startOpacity * (1 - frac), 0);

            var newSize = p.size + (p.growth * (td / 1000));
            p.newTop = newTop;
            p.newLeft = newLeft;

            //Draw!
            ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';
            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }

    requestAnimationFrame(function () { draw(); });
}

function randBetween(n1, n2) {
    var r = (Math.random() * (n2 - n1)) + n1;
    return r;
}


document.addEventListener('mousemove',e => {
    var ctx = c.getContext("2d");
    ctx.fillStyle = 'rgba(150,150,150,' + 1 + ')';
    ctx.globalAlpha = 1;
    ctx.drawImage(smokeImage, e.pageX, e.pageY, 60, 60);
  })