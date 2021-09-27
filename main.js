var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle ='pink';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle ='gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer  = 0;
var cactus_arr = [];
var fps = 144;
var jump_flag = false;
var jump_timer = 0;
let jump_dur = 100;
var animation;

function excuteByFrame(){
    animation = requestAnimationFrame(excuteByFrame);
    timer++;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    if (timer % (fps*2) == 0){
        var cactus = new Cactus();
        cactus_arr.push(cactus);
    }
    cactus_arr.forEach((cact, i, o)=>{
        if (cact.x<0){
            o.splice(i, 1)
        }
        cact.x -= 1;
        colision_check(dino, cact);
        cact.draw();
    })
    if (jump_flag == true){
        dino.y-=((jump_dur-jump_timer)/jump_dur)^2;
        jump_timer++;
    }
    else{
        if (dino.y<200){
        dino.y+=((jump_dur-jump_timer)/jump_dur)^2;
        }
    }
    if (jump_timer > 100){
        jump_flag = false;
        if(jump_timer > 0){
            jump_timer--;
        }
    }
    dino.draw()
}

excuteByFrame();

//충돌 확인

function colision_check(dino, cactus){
    var dx = cactus.x - (dino.x + dino.width);
    var dy = cactus.y - (dino.y + dino.height);
    if (dx < 0 && dy < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}



document.addEventListener('keydown', function(e){
    if (e.code == 'Space'){
        jump_flag = true;
        jump_timer = 0;
    }
})