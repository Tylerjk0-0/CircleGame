let size = 20;
let enSizeMulti = size * 0.1

let circles = [];

let lastSpawnTime = 0;
let spawnInterval = 250;

let alive = true;

let stage = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  
  textAlign(CENTER)
}

function draw() {
  background(0);
  noCursor()
  noStroke()
  fill(255)
  circle(mouseX, mouseY, size);
  
  if (millis() - lastSpawnTime > spawnInterval) {
    lastSpawnTime = millis();
    let maxEnemySize = size * 5;
    let bias = 0.9

    let r = pow(random(), bias); 
    let newSize = lerp(stage - 20, stage + 20, r); 
    circles.push(new Circle(newSize));
  }
  
  for(let i = circles.length - 1; i >= 0; i--){
    
    if(alive){
      circles[i].show();
      circles[i].update();
    }else{
      fill('red');
      textSize(50);
      text('you ded', width/2, height/2)
    }
    
    
    if(circles[i].isOffScreen()){
      circles.splice(i, 1);
    }
    
    if(circles[i].isTouchingPlayer()){
      if(circles[i].size > size){
        alive = false;
      }else{
        if(alive){size += 2}
        circles.splice(i, 1);
      }
    }
  }
  
  if(size > stage){
    stage += 10;
  }
  
  fill('blue');
  textSize(14)
  text('Size: ' + size, 40, 20);
}

class Player {
  constructor(){
    this.size = 10;
    this.pos = createVector()
  }
}

class Circle {
  constructor(size) {
    this.color = random(360);
    this.size = size;
    this.xVel = 0
    this.yVel = 0

    this.wall = floor(random(1, 5))
    
    if (this.wall === 1) {
      this.x = -this.size / 2;
      this.y = random(height); 
      this.xVel = 1;
      this.yVel = random(-1, 1);
    } else if (this.wall === 2) {
      this.x = random(width);
      this.y = -this.size / 2;
      this.xVel = random(-1, 1);
      this.yVel = 1;
    } else if (this.wall === 3) {
      this.x = width + this.size/2;
      this.y = random(height);
      this.xVel = -1;
      this.yVel = random(-1, 1)
    } else if (this.wall === 4) {
      this.x = random(width);
      this.y = height + this.size/2;
      this.xVel = random(-1, 1);
      this.yVel = -1;
    }
  }
  
  isOffScreen() {
    let r = this.size / 2;
    return (
      this.x + r < 0 || 
      this.x - r > width || 
      this.y + r < 0 || 
      this.y - r > height
    );
  }
  
  isTouchingPlayer() {
    let r = this.size / 2
    let d = dist(mouseX, mouseY, this.x, this.y)
    if(d < this.size/2 + size/2){return true; }
    return false;
  }
  
  show() {
    noStroke();
    fill(this.color, 100, 100);
    circle(this.x, this.y, this.size);
  }
  
  update() {
    this.x += this.xVel;
    this.y += this.yVel;
    
  }
}
