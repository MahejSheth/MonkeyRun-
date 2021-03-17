var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime
var survivalTime = 0;

function preload(){
  
  
monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  ground = loadImage("groundImage");
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.5;
  
  banana = createSprite(200,180,400,20);
  banana.addImage("banana",bananaImage);
  banana.scale = 0.5;
  
  obstacle = createSprite(200,180,400,20);
  obstacle.addImage("banana",bananaImage);
  obstacle.scale = 0.5;
 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

  
  
  monkey.setCollider("rectangle",0,0,trex.width,trex.height);
  monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/5 ); 
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        trex.velocityY = -12;        
    }
    
    //giving codes to score
    survivalTime.stroke("black");
    survivalTime.textSize(20);
    survivalTime.fill("black");
    
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivaTime, 100, 50);
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(foodGroup.isTouching(monkey)){
      score = survivalTime+1;
    }
    
    if(obstaclesGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
     
     //change the monkey animation
      monkey.changeAnimation("collided", monkey_collided);
    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
      
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}


