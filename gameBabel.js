//cria o canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width =512;
canvas.height = 480;
document.body.append(canvas);

//imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'images/background.png';

//imagem do heroi
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = 'images/bomb.png';

//imagem monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = 'images/ie.png';

//objetos do jogo
const hero = {
    speed: 170 // movimento em pixels por segundo  
};
const monster = {};
let monsterCaught = 0;

//controle do teclado
const keysDown = {};

window.addEventListener('keydown', function (e) {
    //console.log(e); pressione a tecla e procure o parametro keycode, que informara o 'valor' da tecla desejada
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);

// reseta o jogo quando o jogador pega o monstro
const reset = function () {
    //posiciona o heroi no centro dos eixos
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posiciona o monstro randomicament na tela
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// atualiza os objetos do jogo
const update = function (modifier) {
    //imagine o eixo, negativo = esquerda, positivo = direita

    if (38 in keysDown) { // pressionando a seta pra cima
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { //pressionando a seta pra baixo
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { //pressionando a seta para esquerda
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { //pressionando a seta para direita
        hero.x += hero.speed * modifier;
    }

    // se os personagens se encostam...
    if (
        hero.x <= (monster.x + 32) &&
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.y <= (hero.y + 32)
    ) {
        ++monsterCaught;
        reset();
    }
};

// renderizando...
const render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //pontuacao
    ctx.fillStyle = 'rgb(250, 255, 255)';
    ctx.font = '24px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Janelas do IE fechadas: ' + monsterCaught, 32, 32);
};

//controla o loop do jogo / alimenta o modifier
const main = function () {
    const now = Date.now();
    const delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // executa isso o mais breve possivel
    requestAnimationFrame(main);
};

//suporte cross-browser para requestAnimationFrame 
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//que comece o jogo
let then = Date.now();
reset();
main();
