 //Variaveis sendo criadas
var Stark;
var Arrow, ArrowImg;
var StarkAnm, StarkAnmLeft, StarkImg, ArrowAnm, StarkImgLeft, ArrowImgLeft;
var limiteInv;
var edges;
var andar1, bg;
var isJumping=0
var SlimeImg, Slime;
var TurnLeft=0;

//Carregar imagens
function preload() {
  StarkAnm=loadAnimation("assets/P1.png","assets/P2.png","assets/P3.png","assets/P4.png","assets/P5.png","assets/P6.png","assets/P7.png");
  StarkAnm.playing = true;
  StarkAnm.looping = true;
  StarkImg = loadImage("assets/P0.png");
  StarkImgLeft = loadImage("assets/Pleft1.png");
  ArrowImgLeft = loadImage("assets/ArrowLeft.png");
  StarkAnmLeft = loadAnimation("assets/Pleft1.png", "assets/Pleft2.png", "assets/Pleft3.png", "assets/Pleft4.png", "assets/Pleft5.png", "assets/Pleft6.png", "assets/Pleft7.png", "assets/Pleft8.png");
  bg = loadImage("assets/fundo.jpg");
  ArrowImg = loadImage("assets/Arrow.png");
  
  SlimeImg = loadImage("assets/Slime.jpg");
  

}




function setup() {

  createCanvas(1536,864);

  //Adicionando imagens/animações nas variaveis
  Stark = createSprite(500,600,1,1);
  Stark.addAnimation('stark', StarkImg);
  Stark.addAnimation('stark_walking', StarkAnm);
  Stark.addAnimation('stark_left', StarkAnmLeft);
  Stark.addAnimation('StarkPleft1',StarkImgLeft);
  
  Stark.scale=1.4;

// Criando chãosasso invisivel
  limiteInv = createSprite(200, 860, 2000, 10);
  limiteInv.visible = false;

  //Criando Slime
  Slime = createSprite(900,800,1,1);
  Slime.addImage(SlimeImg);
  Slime.scale=0.25;
  
}

function draw() {

  background(220);
  drawSprites();

  // Atirando flecha pra os 2 lados
  if(keyDown('space')){
    ShootArrow();
  }

/*
  if (TurnLeft===0){
    Stark.changeAnimation('stark')
  } else{
    Stark.changeAnimation('StarkPleft1');
  }
*/

  //Movimentações esquerda e direita do personagem.
  if(keyIsDown(LEFT_ARROW)){
    Stark.x-=10;
    Stark.changeAnimation('stark_left');
    TurnLeft=1
  }else if(keyIsDown(RIGHT_ARROW)){
    Stark.x+=10;
    Stark.changeAnimation('stark_walking');
    TurnLeft=0
  }

  Jump();
  
  }

  function Jump(){

    //Adicionar pulo
  if(keyDown(UP_ARROW)){
    isJumping=isJumping+1
  }
  
  if(keyDown(UP_ARROW)&& isJumping<=2){
   Stark.velocityY=-15;
  }

  Stark.velocityY = Stark.velocityY+0.8;
  Stark.collide(limiteInv);
  console.log(Stark.y);
  
  if(Stark.isTouching(limiteInv)){
    isJumping=0;
  }
  
  }

 //Pra o Stark parar pra os 2 lados
  function keyReleased(){
    if (keyCode===LEFT_ARROW){
      Stark.changeAnimation('StarkPleft1');
      TurnLeft=1;
    } else{
      Stark.changeAnimation('stark');
      TurnLeft=0;
    }
  }
// A função de atirar a flecha
 function ShootArrow(){
  if(TurnLeft===1){
   Arrow=createSprite(Stark.x, Stark.y, 1, 1)
   Arrow.addImage(ArrowImgLeft);
   Arrow.scale=0.07
   Arrow.velocityX = -3
  Stark.changeAnimation('StarkPleft1');
  } else{
    Arrow = createSprite(Stark.x, Stark.y,1,1);
    Arrow.addImage(ArrowImg);
    Arrow.scale=0.07
    Arrow.velocityX=3
  }
}
  
  

    
  