var bg,bg_Image;

var spaceShip,spaceShip_Image;

var leftEdge,rightEdge;

var shooter,shooter_Image,shooterGroup;

var enemy1,enemy1_Image,enemyGroup1;

var hit_Sound;
var die_Sound;

var score = 0;
var life = 3;

var gameOver,gameOver_Image;

var fire_Sound;

var enemyLaser,enemyLaser_Image,enemyLaserGroup;

function preload(){
  bg_Image = loadImage("bg.png");
  spaceShip_Image = loadImage("ship.png");
  shooter_Image = loadImage("shooter.png");

  enemy1_Image = loadImage("enemy1.png");

  hit_Sound = loadSound("hit_Sound.mp3");
  die_Sound = loadSound("die_Sound.mp3");

  gameOver_Image = loadImage("gameOver.png");

  fire_Sound = loadSound("fire_Sound.mp3");

  enemyLaser_Image = loadImage("enemyLaser.png");

}

function setup(){
  createCanvas(400,600);

  bg = createSprite(200,300);
  bg.addImage("backgroundimage",bg_Image);
  bg.scale = 1.8; 
  bg.velocityY = +9;

  spaceShip = createSprite(180,550);
  spaceShip.addImage("player",spaceShip_Image);
  spaceShip.scale = 0.9;

  leftEdge = createSprite(2,300,5,600);
  leftEdge.shapeColor = "white";
  leftEdge.visible = false;

  rightEdge = createSprite(397,300,5,600);
  rightEdge.shapeColor = "white";
  rightEdge.visible =false;

  shooterGroup = new Group();
  enemyGroup1 = new Group();
  enemyLaserGroup = new Group();

  score = 0;
  life = 3;

  gameOver = createSprite(200,300,10,10);
  gameOver.addImage("end",gameOver_Image);
  gameOver.scale = 3;
  gameOver.visible = false;

}

function draw(){
  background("black");



  if(bg.y >350){
    bg.y = 150;
  }

  if(keyDown("left_arrow")){
    spaceShip.x = spaceShip.x - 16;
  }

  if(keyDown("right_arrow")){
    spaceShip.x = spaceShip.x + 16;
  }

  if(keyDown("space")){
    createShooter();
    hit_Sound.play();
  }

 

  spaceShip.collide(leftEdge);
  spaceShip.collide(rightEdge);


  enemy1Group();
  enemyLaserGroup1();

  if(enemyLaserGroup.isTouching(spaceShip)){
    enemyLaserGroup.destroyEach();
    die_Sound.play();

    life = life - 1;
  }
  
  if(shooterGroup.isTouching(enemyGroup1)){
    shooterGroup.destroyEach();
    fire_Sound.play();
    enemy1.destroy();
    score = score + 5;  
  }

  if(shooterGroup.isTouching(enemyLaserGroup)){
    enemyLaserGroup.destroyEach();
    shooterGroup.destroyEach();
    fire_Sound.play();
    score = score + 2;
  }
 

  if(enemyGroup1.isTouching(spaceShip)){
    die_Sound.play();
    enemyGroup1.destroyEach();
    life = life - 1;
  }


  if(life === 0){
    gameOver.visible = true;
    enemyGroup1.destroyEach();
    bg.velocityY = 0;

    enemyGroup1.setVelocityYEach(0);

 
    shooterGroup.destroyEach();

    spaceShip.destroy();

    enemyLaserGroup.destroyEach();


  }

  drawSprites();

  fill("red");
  textSize(35);
  text(""+ score,10,590);
  
  fill("red");
  textSize(35);
  text(""+ life,360,590);

}

function createShooter(){
  shooter = createSprite(spaceShip.x,520,10,10);
  shooter.addImage("laserBeam",shooter_Image);
  shooter.scale = 2;
  shooter.velocityY = - 30;
  shooterGroup.add(shooter);
}

function enemy1Group(){
  if(frameCount % 50 === 0){
    enemy1 = createSprite(50,5);
    enemy1.addImage("enemy1",enemy1_Image);
    enemy1.scale = 1.5;

    enemy1.x=Math.round(random(30,370));
    enemy1.velocityY= + 9;

    enemyGroup1.add(enemy1);
  }
}

function enemyLaserGroup1(){
  if(frameCount % 50 === 0){
  enemyLaser = createSprite(enemy1.x,18,6,25);
 enemyLaser.addImage("enemylaser",enemyLaser_Image);
 enemyLaser.scale = 3.5;
  enemyLaser.velocityY = + 15;
  enemyLaserGroup.add(enemyLaser);
  }
}
