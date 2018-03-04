var a;
var b;
var padding = 70;

//HOME LOCATION VARS
var x;
var y;
var side = 90;

//SHIELD
var xchange = 0; // location of shield
var shieldSize = 60;
var shieldx1, shieldy1, shieldx2, shieldy2;


var circXb;
var circYb;

var time = 0;
var list = [];

var sounds = [];
var songs = [];
/*
function preload(){
    soundFormats('mp3');
    sounds = ['A.mp3','B.mp3','Bb.mp3','C.mp3','Cs.mp3','D.mp3', 'E.mp3', 'Eb.mp3', 'F.mp3','Fs.mp3','G.mp3','Gs.mp3'];    
    for (let i = 0;i<13;i++){
        songs.push(loadSound(sounds[i]));
    }
}*/

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    var width = displayWidth;
    var height = displayHeight;
    
    circXb = 0;
    circYb = height / 2 - side / 2;
}

function draw() {
    background('white');
    a = width;
    b = height;
    strokeWeight(1);
    textSize(40);
    fill('black');
    //text('Defend the box!', a / 2 - a / 11, 50);
    x = a / 2 - side / 2;
    y = b / 2 - side / 2;
    noFill();
    stroke('black');
    rectMode(CENTER);
    rect(x + side / 2, y + side / 2, side, side, 5, 5, 5, 5); //box
    fill('red');
    ellipse(a / 2, b / 2, 10); // center

    noFill();
    //ellipse(a/2, b/2, side+padding);
    updateShield();


    time++;
    if (time % 50 == 0) {
        x = spawnRandom();
        list.push(x);
    }

    update();

}
/*
function pianoSound(angle) {
    var song;
    console.log(angle);
    song = songs[angle];
    song.play();
}*/

function updateShield() {
    if (keyIsDown(RIGHT_ARROW)) {
        xchange++;
    }
    if (keyIsDown(LEFT_ARROW)) {
        xchange--;
    }
    //point on circle
    var m = map(xchange, 0, 60, 0, TAU) - HALF_PI;
    let x = width / 2 + cos(m) * (side + padding) / 2;
    let y = height / 2 + sin(m) * (side + padding) / 2;

    //final points
    let p1x = x + shieldSize * sin(PI - m);
    let p1y = y + shieldSize * cos(PI - m);

    let p2x = x - shieldSize * sin(PI - m);
    let p2y = y - shieldSize * cos(PI - m);

    stroke('brown');
    strokeWeight(7);
    line(p1x, p1y, p2x, p2y);
    shieldx1 = p1x;
    shieldx2 = p2x;
    shieldy1 = p1y;
    shieldy2 = p2y;
}

window.onresize = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.size(w, h);
    width = w;
    height = h;
};

function spawnRandom() {
    var y = Math.random();
    var rand = Math.floor(map(y, 0, 1, 0, 4)) + 1;
    return randomSpawn(rand);
}

function update() {
    //pianoSound(4);
    for (let i = 0; i < list.length; i++) {
        var x = list[i][0];
        var y = list[i][1];
        x += list[i][2] / 80;
        y += list[i][3] / 80;
        list[i][0] = x;
        list[i][1] = y;
        fill(Math.random(255), Math.random(255), Math.random(255));
        ellipse(x, y, 10);
        isColliding = collideLineCircle(shieldx1,shieldy1,shieldx2,shieldy2,x,y,10);
        isLose = collideCircleCircle(x,y,10,a / 2, b / 2, 10);
        if (isColliding){
            var r = Math.random();
            var p = map(r,0,1,1,13);
            //pianoSound(Math.floor(p));
            list.splice(i,1);
        }
        
        if (isLose) {            
            window.location.href = 'end.html';
        }
    }
}

function randomSpawn(y) { // y = 1,2,3,4
    var circx;
    var circy;
    var percentage = Math.random();
    switch (y) {
    case 1: // LEFT SIDE
        circx = 0;
        circy = map(percentage, 0, 1, 0, height);
        break;
    case 2: // TOP SIDE
        circx = map(percentage, 0, 1, 0, width);
        circy = 0;
        break;
    case 3: // RIGHT SIDE
        circx = width;
        circy = map(percentage, 0, 1, 0, height);
        break;
    case 4: // BOTTOM SIDE
        circx = map(percentage, 0, 1, 0, width);
        circy = height;
        break;
    default:
        break;
    }

    var d_x = width / 2 - circx;
    var d_y = height / 2 - circy;
    var arr = [circx, circy, d_x, d_y];
    return arr;
}