const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 12; //var that needs to scale
let adjustY = 10; //var that needs to scale

//mouse controle
let mouse = {
    x: undefined,
    y: undefined,
    rad: 150
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

//class to extract particles
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3; //var that needs to scale
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
        this.mouseContact = false;
    }
    draw() {
        if (this.mouseContact == false) {
            ctx.fillStyle = 'white';
        } else {
            ctx.fillStyle = 'red';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let FDistX = dx / dist;
        let FDistY = dy / dist;
        let force = (mouse.rad - dist) / mouse.rad;
        let dirX = FDistX * force * this.density;
        let dirY = FDistY * force * this.density;

        if (dist < mouse.rad) {
            if (this.x - this.size > 0 && this.x + this.size < canvas.width) {
                this.x -= dirX;
            }
            if (this.y - this.size > 0 && this.y + this.size < canvas.height) {
                this.y -= dirY;
            }
            this.mouseContact = true;
        } else {
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 15;
            }
            if (this.y != this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 15;
            }
            this.mouseContact = false;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

function connect() {
    for (let i = 0; i < particleArray.length; i++) {
        for (let j = i + 1; j < particleArray.length; j++) {
            //get distance between particles
            let dx = particleArray[i].x - particleArray[j].x;
            let dy = particleArray[i].y - particleArray[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            //draw lines
            if (dist < 40) { //var that needs to scale
                let colour = 'white';
                if (particleArray[i].mouseContact == true || particleArray[j].mouseContact == true) {
                    colour = 'red';
                }
                ctx.strokeStyle = colour;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function init() {
    particleArray = [];
    ctx.fillStyle = 'white';
    ctx.font = '20px Verana';
    ctx.fillText('Hello World!', 0, 30);
    const TextCoordinates = ctx.getImageData(0, 0, 120, 30);
    for (let y = 0, y2 = TextCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = TextCoordinates.width; x < x2; x++) {
            if (TextCoordinates.data[(y * 4 * TextCoordinates.width) + (x * 4) + 3] > 128) {
                let posX = x + adjustX;
                let posY = y + adjustY;
                particleArray.push(new Particle(posX * 15, posY * 15));
            }
        }
    }
    animate();
}

init();