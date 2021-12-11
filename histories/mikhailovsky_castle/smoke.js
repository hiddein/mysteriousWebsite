// Настройки анимации дымка
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

// Генерация массива с частицами для сцены
pCount = 0;
var beginTime = new Date().getTime()
for (var i2 = 0; i2 < particlesPerPuff; i2++) {
    pCollection[pCount++] = newParticle(i2 * particleDelay + beginTime);
}

// Запуск отрисовки частиц
draw()

/// Создание частицы для сцены и настройка ее параметров случайным образом
function newParticle(delay) {

    var p = {};
    p.top = c.height;
    p.left = randBetween(-200, c.width);

    p.start = delay;
    p.life = 8000;
    p.speedUp = 40;

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

/// Запуск откисовки сцены
function draw() {
    // Очистка canvas
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = c.width;

    // Отрисовка поочередно каждой частицы на сцене 
    for (var i = 0; i < pCount; i++) {
        var p = pCollection[i];

        // Определение времени
        var td = new Date().getTime() - p.start;
        var frac = td / p.life

        if (td > 0) {
            // Если частица "умерла", то генерируем ей замену
            if ( td > p.life ) {
                // Новое время появления частицы = старое время появления + длительность сцены
                pCollection[i] = newParticle( (particlesPerPuff - 1) * particleDelay + pCollection[i].start ); 
                continue;
            }

            // расчет новых параметров частицы в новом кадре
            var newTop = p.top - (p.speedUp * (td / 1000));
            var newLeft = p.left + (p.speedRight * (td / 1000));
            var newOpacity = Math.max(p.startOpacity * (1 - frac), 0);

            var newSize = p.size + (p.growth * (td / 1000));
            p.newTop = newTop;
            p.newLeft = newLeft;

            // Отрисовка
            ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';
            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }
    // Запуск анимации для отрисовки нового кадра
    requestAnimationFrame(function () { draw(); });
}

/// Генерация случайного числа из заданного диапазона
function randBetween(n1, n2) {
    var r = (Math.random() * (n2 - n1)) + n1;
    return r;
}

/// Свечение под курсором мыши
document.addEventListener('mousemove',e => {
    var lamp = document.getElementById("lamp");
    lamp.style.top = e.pageY + "px";
    lamp.style.left = e.pageX + "px";
    lamp.style.transform = "translate(-50%,-50%)"
  })