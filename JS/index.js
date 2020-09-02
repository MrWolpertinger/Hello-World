const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

//mouse controle
let mouse = {
    x: null,
    y: null,
    rad: 150
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //    console.log(mouse.x, mouse.y);
});

//ctx.fillStyle = 'white';
//ctx.font = '30px Verdana';
//ctx.fillText('AAA', canvas.width / 2, canvas.height / 2);
//const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

//class to extract particles
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particleArray = [];
    particleArray.push(new Particle(50, 50));
}
init();
console.log(particleArray);