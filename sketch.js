var mainPlane, mainImg;
var enemy, enemy1Img;
var enemy2Img;
var  enemy3Img;
var  enemy4Img;
var  enemy5Img;
var  enemy6Img;
var  enemy7Img;
var  enemy8Img;
var sky, skyImg;
var life, heart1Img;
var life2, heart2Img;
var life3, heart3Img;
var life = 3;
var score = 0;
var Gamestate = "Play";
var bullets = 45;
var bullet;
var gameOver, overImg;
var win, winImg;
var resetbutton, buttonImg;


function preload(){
mainImg = loadImage("mainShip.png");
enemy1Img = loadImage("enemy1.png");
enemy2Img = loadImage("enemy2.png");
enemy3Img = loadImage("enemy3.png");
enemy4Img = loadImage("enemy4.png");
enemy5Img = loadImage("enemy5.png");
enemy6Img = loadImage("enemy6.png");
enemy7Img = loadImage("enemy7.png");
enemy8Img = loadImage("enemy8.png");
heart1Img = loadImage("heart_1.png");
heart2Img = loadImage("heart_2.png");
heart3Img = loadImage("heart_3.png");
skyImg = loadImage("skyBackground.png");

buttonImg = loadImage("replayB.png");

overImg = loadImage("gameOver.png");
winImg = loadImage("Youwin.png");
	
}

function setup() {
	createCanvas(800, 700);

  sky = createSprite(displayWidth/2-600,displayHeight/2-250,20,20)
  sky.addImage(skyImg)
  sky.scale = 7;

  mainPlane = createSprite(350, 630, 50, 50);
  mainPlane.addImage(mainImg)
  mainPlane.scale = 1.3
  //mainPlane.debug = true
  mainPlane.setCollider("rectangle",0,0,150,150)

life1 = createSprite(750,40,50,50)
life1.addImage(heart1Img)
life1.scale = 0.3
life1.visible = false;

life2 = createSprite(720,40,50,50)
life2.addImage(heart2Img)
life2.scale = 0.3
life2.visible = false;

life3 = createSprite(690,40,50,50)
life3.addImage(heart3Img)
life3.scale = 0.3;

gameOver = createSprite(350,350,50,50)
gameOver.addImage(overImg);
gameOver.scale = 1.2;
gameOver.visible = false;

win = createSprite(350,350,50,50)
win.addImage(winImg);
win.scale = 1;
win.visible = false;

resetbutton = createSprite(350, 520, 50,50);
resetbutton.addImage(buttonImg);
resetbutton.scale = 0.3;
resetbutton.visible = false;

enemyG = new Group();
bulletG = new Group();

}


function draw() {
  //rectMode(CENTER);
  background(0);

  if(Gamestate === "Play"){
    createEnemy()

  if(keyDown("UP_ARROW")&& mainPlane.y> 450){
      mainPlane.y = mainPlane.y-10
  
  }
  if(keyDown("DOWN_ARROW")&& mainPlane.y< 700){
   mainPlane.y = mainPlane.y+10
  }
  
  if(keyDown("RIGHT_ARROW")&& mainPlane.x< 800){
    mainPlane.x = mainPlane.x+30
   }
   
   if(keyDown("LEFT_ARROW")&& mainPlane.x> 0){
    mainPlane.x = mainPlane.x-30
   }

   if(keyWentDown("space")&& Gamestate === "Play"){
 
    bullet = createSprite(mainPlane.x - 5,mainPlane.y-50,5,20)
    bullet.velocityY = - 60; 
    bullets = bullets-1;
    bulletG.add(bullet);
   
  }

  if(life === 3){
    life3.visible = true;
    life2.visible = false;
    life1.visible = false;
  
  }
  
  if(life === 2){
    life3.visible = false;
    life2.visible = true;
    life1.visible = false;
  
  }
  
  if(life === 1){
    life3.visible = false;
    life2.visible = false;
    life1.visible = true;
  
  }
  
  if(life === 0){
    life3.visible = false;
    life2.visible = false;
    life1.visible = false;
    Gamestate = "End"
  }

  if(bullets === 0){
    Gamestate = "OutofAmmo"
   bullets = bullets+0;
    }
  
  if(score === 200){
    Gamestate = "Win"
  }

   if(enemyG.isTouching(mainPlane)){
    life3.visible = false
    life2.visible = true;
    
    for(var i = 0; i<enemyG.length;i++){
      if(enemyG[i].isTouching(mainPlane)){
        enemyG[i].destroy();
      }
  
    }
    life = life -1;
  
   }

  if(bulletG.isTouching(enemyG)){
  
  
    for(var z = 0; z<enemyG.length;z++){
      if(enemyG[z].isTouching(bulletG)){
        enemyG[z].destroy();
        bulletG.destroyEach();
      }
    }
    score = score+5
  }
  
  }

  if(mousePressedOver(resetbutton.ismousePressedOver)){
    Gamestate = "reset"
  }
  
  drawSprites();

  if(Gamestate === "OutofAmmo"){
    textSize(30)
    fill("red")
    text("You are out of ammo!",250,350)
    mainPlane.destroy()
    enemyG.destroyEach();
    bulletG.destroyEach();
  }

  if(Gamestate === "End"){
    mainPlane.visible = false;
    enemyG.destroyEach();
    gameOver.visible = true;
    resetbutton.visible = true;
    if(mousePressedOver(resetbutton)){
      reset();
    }
  }

  if(Gamestate === "Win"){
    mainPlane.visible = false;
    enemyG.destroyEach();
    win.visible = true;
    resetbutton.visible = true;
    if(mousePressedOver(resetbutton)){
      reset();
    }
  }

  textSize(20)
  fill("red")
  text("Bullets: " +bullets, 150, 50)

  textSize(20)
  fill("green")
  text("Score: " +score, width/100, 50)
 
}

function createEnemy(){
  if (frameCount % 120 == 0) {
  enemy = createSprite(Math.round(random(50, 600),40, 10, 10));
    
   var rand = Math.round(random(1,8)); 
   switch(rand) {
      case 1:enemy.addImage(enemy1Img);
             break;
      case 2:enemy.addImage(enemy2Img); 
             break;
      case 3:enemy.addImage(enemy3Img);   
             break;
      case 4:enemy.addImage(enemy4Img);
             break;
      case 5:enemy.addImage(enemy5Img);   
             break;
      case 6:enemy.addImage(enemy6Img);
            break;
      case 7:enemy.addImage(enemy7Img);   
             break;
      case 8:enemy.addImage(enemy8Img);
              break;
      default: break; 
   }

   enemy.velocityY=(8+Math.round(score/10)) ;
    enemy.scale=1.3;
    enemy.lifetime=200;
    enemyG.add(enemy);

  }
} 

function reset(){
  Gamestate = "Play"
  gameOver.visible = false;
  win.visible = false;
  mainPlane.visible = true;
  life = 3;
  bullets = 45;
  resetbutton.visible = false;

}