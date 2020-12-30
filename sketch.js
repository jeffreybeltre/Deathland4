var ted, tedImage, tedStill;
var jeff, jeffImage, jeffStill;

var zombie, zombieImage, zompbieGroup;
var bg;

var ground1, ground2;

var gun1, gun2, gunImage;
var bullet, bulletImage, bulletGroup;

var score;

var die, gunSilencer, music;

function preload() {
  tedImage = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png");
  tedStill = loadAnimation("b5.png");
  
  bg = loadImage("bg.jpg");
  
  jeffImage = loadAnimation("j1.png","j2.png","j3.png","j4.png","j5.png","j6.png","j7.png","j8.png","j9.png","j10.png");
  jeffStill = loadAnimation("j7.png");
  
  zombieImage = loadAnimation("z1.png","z2.png","z3.png","z4.png","z5.png","z6.png","z7.png","z8.png");
  
  gunImage = loadImage("gun.png");
  bulletImage = loadImage("bullet.png");

  die = loadSound("die.mp3");
  gunSilencer = loadSound("Gun+Silencer.mp3");
  music = loadSound("music.mp3");
}


function setup() {
  createCanvas(1500,750);
  
  music.loop();
  
  ted = createSprite(100,700);
  ted.addAnimation("tedStill",tedStill);
  ted.addAnimation("ted",tedImage);

  jeff = createSprite(200,700);
  jeff.addAnimation("jeffStill",jeffStill);
  jeff.addAnimation("jeff",jeffImage);

  gun1 = createSprite(ted.x+30, ted.y);
  gun2 = createSprite(jeff.x+30, jeff.y);
  gun1.addImage(gunImage);
  gun1.scale = 0.2;
  gun2.addImage(gunImage);
  gun2.scale = 0.2;

  zombieGroup = new Group();
  bulletGroup = new Group();
  
  ground1 = createSprite(750,580,2000,20);
  ground1.visible = false;
  ground2 = createSprite(750,760,2000,20);
  ground2.visible = false; 

  score = 0;
}

function draw() {
  background(bg); 
  
  
  if(keyDown("up")){
    if(ted.y>560){
    ted.y = ted.y -5;
    ted.changeAnimation("ted",tedImage);
    }
  }
  
  if(keyWentUp("up")){
    ted.changeAnimation("tedStill",tedStill);
  }
  
  if(keyDown("down")){
    ted.y = ted.y +5;
    ted.changeAnimation("ted",tedImage);
  }

  if(keyWentUp("down")){
    ted.changeAnimation("tedStill",tedStill);
  }


  if(keyDown("left")){
    ted.x = ted.x -5;
    ted.changeAnimation("ted",tedImage);
  }

  if(keyWentUp("left")){
    ted.changeAnimation("tedStill",tedStill);
  }

  if(keyDown("right")){
    ted.x = ted.x +5;
    ted.changeAnimation("ted",tedImage);
  }

  if(keyWentUp("right")){
    ted.changeAnimation("tedStill",tedStill);
  }
  

  //moving jeff
  if(keyDown("w")){
    if(jeff.y>560){
    jeff.y = jeff.y -5;
    jeff.changeAnimation("jeff",jeffImage);
    }
  }

  if(keyWentUp("w")){
    jeff.changeAnimation("jeffStill",jeffStill);
  }
  
  if(keyDown("s")){
    jeff.y = jeff.y +5;
    jeff.changeAnimation("jeff",jeffImage);
  }

  if(keyWentUp("s")){
    jeff.changeAnimation("jeffStill",jeffStill);
  }

  if(keyDown("a")){
    jeff.x = jeff.x -5;
    jeff.changeAnimation("jeff",jeffImage);
  }

  if(keyWentUp("a")){
    jeff.changeAnimation("jeffStill",jeffStill);
  }

  if(keyDown("d")){
    jeff.x = jeff.x +5;
    jeff.changeAnimation("jeff",jeffImage);
  }

  if(keyWentUp("d")){
    jeff.changeAnimation("jeffStill",jeffStill);
  }

  gun1.x = ted.x + 30;
  gun1.y = ted.y;

  gun2.x = jeff.x + 30;
  gun2.y = jeff.y;

  ted.collide(ground2);
  jeff.collide(ground2);

  spawnEnemy();
  
  if(keyDown("space")){
    shootJeff();
  }

  if(keyDown("m")){
    shootTed();
  }

  if(bulletGroup.isTouching(zombieGroup)){
    die.play();
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
    score++; 
  }
   
  drawSprites();

  textSize(35);
  fill("white");
  text("Zombie Killed: "+ score, 600,100);
}

function spawnEnemy(){
  if (frameCount % 200 === 0) {
    zombie = createSprite(1500,120,40,10);
    zombie.y = Math.round(random(560,750));
    zombie.addAnimation("zombies",zombieImage);
    zombie.scale = 1;
    zombie.velocityX =-1;
    
     //assign lifetime to the variable
    zombie.lifetime = 1500;
    
    //add each cloud to the group
    zombieGroup.add(zombie);
  }
  

}

function shootTed(){
  bullet = createSprite(gun1.x +55, gun1.y-5);
  bullet.addImage(bulletImage);
  bullet.velocityX = 8;
  bullet.scale = 0.03;
  bullet.lifetime = 1500;
  bulletGroup.add(bullet);
  gunSilencer.play();
}

function shootJeff(){
  bullet = createSprite(gun2.x +55, gun2.y-5);
  bullet.addImage(bulletImage);
  bullet.velocityX = 8;
  bullet.scale = 0.03;
  bullet.lifetime = 1500;
  bulletGroup.add(bullet);
  gunSilencer.play();
}





