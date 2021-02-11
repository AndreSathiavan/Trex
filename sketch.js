//global/public variables
var trex ,trex_running ,ground ,ground_image ,cloud ,cloud_image ,obstacle ,obstacle_image1 ,obstacle_image2 ,obstacle_image3 ,obstacle_image4 ,obstacle_image5 ,obstacle_image6 ,rand ,score = 0,gameState='PLAY',name ,obstacle_group ,cloud_group , trex_crash ,crash_image ,gameOver ,game_overImg ,restart ,restart_image ,high_score = 0 ,counter ,check_point,trex_die,jump;

//Types of variables
//trex,ground,cloud,obstacle --> sprite
//trex_running ---> Animation
// ground_image,cloud_image ---> image
//rand,numeric --> numeric variable
//gameState --> text / string variables (enclosed in quotes)


function preload(){ // loading images or sound files
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
 ground_image = loadImage("ground2.png");
  crash_image = loadImage("trex_collided.png");
  cloud_image = loadImage("cloud.png");
  game_overImg = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
  
  obstacle_image1 = loadImage("obstacle1.png");
  obstacle_image2 = loadImage("obstacle2.png");
  obstacle_image3 = loadImage("obstacle3.png");
  obstacle_image4 = loadImage("obstacle4.png");
  obstacle_image5 = loadImage("obstacle5.png");
  obstacle_image6 = loadImage("obstacle6.png");
  check_point = loadSound("checkPoint.mp3");
  trex_die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");

}

function setup(){ // create sprites and one time run code
  createCanvas(600,200)

  //create a trex sprite
  trex = createSprite(50,160,20,50);
  //trex.debug=true;
  trex.setCollider('rectangle',0,0,200,100);
  trex.scale=0.7; 
  trex.addAnimation("running", trex_running);
  trex.addAnimation("crashed", crash_image);
 ground = createSprite(300,185,600,20);  ground.addImage(ground_image); console.log(ground.depth);  ground2 = createSprite(300,200,600,20);  ground2.visible=false; 
trex.depth=ground.depth+1 ; // trex     is ordered above the ground
  obstacle_group = new Group();
  cloud_group = new Group();
  restart = createSprite(300,120);
  restart.addImage(restart_image);
  restart.scale = 0.8;
  restart.visible=false;
   gameOver = createSprite(300,80,20,20);
    gameOver.addImage(game_overImg);
   gameOver.scale = 0.8;
  gameOver.visible=false;
  

}

function draw(){ // repetitive - recursive
  background(160)
  
  if(gameState=='PLAY'){
  if(keyDown("space") && trex.collide(ground2) && gameState=='PLAY' || keyDown("UP_ARROW") && trex.collide(ground2) && gameState=='PLAY'){
    trex.velocityY = -11;
    jump.play();
  }
  // setting the gravity for the trex
  trex.velocityY = trex.velocityY + 0.5;
  ground.velocityX = -7;
    
    gameOver.visible=false;
    restart.visible=false;
  
  if(ground.x < 0){
   ground.x = ground.width/2;
  }
  
    
    
  //String concatenation (means addition)
//  name='Sathiavan';
 // console.log('Andre ' + Math.round(random(1,10)) + ' Sathiavan' );
  //console.log("Andre "+20);
  //console.log('10 + 20 = ' + (10 + 20));
  //console.log("Sathiavan");
  
  
  if(frameCount%3===0){
    score = score + 1;
  }

  
      createClouds();
      createObstacles();

     if(trex.isTouching(obstacle_group)){
 //   gameState = 'end';
    trex.velocityY = -7;
   // jump.play();
    trex.velocityY = trex.velocityY + 0.5;
   // trex_die.play();
 }
  }

  
  if(gameState=='end'){
   ground.velocityX = 0;
   cloud_group.setVelocityXEach(0);
   obstacle_group.setVelocityXEach(0);
  trex.changeAnimation("crashed",crash_image);
    cloud_group.setLifetimeEach(-1);
    obstacle_group.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    counter=1;
      if(score>high_score){
    high_score=score;
  }
 //local/private variable in brackets
    //cloud_group.setDestroyEach(0);
    //obstacle_group.setDestroyEach(0);
  }
  //console.log(gameState);
  if(mousePressedOver(restart) || keyDown("space") && gameState=='end'){
    gameState = 'PLAY';
    gameOver.visible=false;
    restart.visible=false;
    obstacle_group.destroyEach();
    cloud_group.destroyEach();
    trex.changeAnimation("running" ,trex_running);
    score=0;
    
  }

  if(score%100==0 && score>0){
    check_point.play();
   // obstacle_group.setVelocityXEach = obstacle_group.setVelocityXEach + 1;
  //  cloud_group.setVelocityXEach = cloud_group.setVelocityXEach + 1; 
    ground.velocityX = ground.velocityX + 1;
  }
  
  
  
  if(counter==1){
  fill("white");
  text("High Score : "+high_score ,400,20);
  }
 // text(score,580,20);
  fill("white");
  text('Score :'+score,500,20)
//trex.collide(ground2);
  
  
  drawSprites();

}

function createClouds()
{
  if(frameCount%80===0){
  cloud = createSprite(600,random(50,100),20,10);
  cloud.addImage(cloud_image);
  cloud.velocityX = -7 - score/100;
  trex.depth=cloud.depth+1;
  cloud.lifetime=130;
    cloud_group.add(cloud);
  }

}

function createObstacles()
{
  if(frameCount%150===0){
 obstacle = createSprite(600,170,10,10);
    obstacle.scale = 0.6 ;
  obstacle.velocityX = -7 - score/100; 
   rand = Math.round(random(1,6));
    switch(rand)
      {
        case 1:obstacle.addImage(obstacle_image1);break;
        case 2:obstacle.addImage(obstacle_image2);break;
        case 3:obstacle.addImage(obstacle_image3);break;
        case 4:obstacle.addImage(obstacle_image4);break;
        case 5:obstacle.addImage(obstacle_image5);break;
        case 6:obstacle.addImage(obstacle_image6);break;
        default:break;
      }
    obstacle.lifetime=160;
    obstacle_group.add(obstacle);
  }
}

