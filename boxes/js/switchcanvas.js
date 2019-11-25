
//preparation: open chrome incognito
//path: cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/NYU/Creative\ Coding/boxes
  //‘‘‘“


var main, cnv, amp, capture, mySound1, mySound2, mySound3, mySound, speed
var selectId =0
var angle=0.01

function preload() {
  //preload songs
  soundFormats('mp3');
  mySound1 = loadSound('music/Durmus.mp3');
  mySound2 = loadSound('music/Lifeline.mp3');
  mySound3 = loadSound('music/CYGN.mp3');
}


function setup(){
  rectMode(CENTER);
  
  ellipseMode(CENTER);
  frameRate(60);

  //////set three canvas
  cnv=[];
  main = createCanvas(windowWidth,windowHeight)
  cnv[0] = createGraphics(windowWidth,windowHeight,WEBGL)
  cnv[0].background(0)
  cnv[1] = createGraphics(windowWidth,windowHeight,WEBGL)
  cnv[1].background(0)
  cnv[2] = createGraphics(windowWidth,windowHeight,WEBGL)
  cnv[2].background(0)

  // mySound=[];
  // mySound[0]=mySound1.update
  // mySound[1]=mySound2.update
  // mySound[2]=mySound3.update
  // speed=mySound[selectId];
  
  


  //when a button is pressed, show its canvas accordingly, and play a song
  select('#item1').mousePressed(function(){
    selectId=0;
    mySound3.stop();
    mySound2.stop();  
    mySound1.stop();
    mySound1.play();
    
  })


  select('#item2').mousePressed(function(){
    selectId=1;
    mySound3.stop();
    mySound2.stop();  
    mySound1.stop();
    mySound2.play();
    
  })


  select('#item3').mousePressed(function(){
    selectId=2;
    mySound3.stop();
    mySound2.stop();  
    mySound1.stop();
    mySound3.play();
    
  })



  //sound
  amp = new p5.Amplitude();
  


  // // Turn on the camera????
  // capture = createCapture(VIDEO);
  // capture.size(width, height);
  // capture.hide();
  /////image
  pixelDensity(1)

}


function draw(){
  //print(frameCount)
 // print(noise(frameCount))
  //draw seleted graphics to the canvas
  drawing1(cnv[0])
  drawing2(cnv[1])
  drawing3(cnv[2])
  image(cnv[selectId],0,0) 

  
  //background graphics
  speed = mySound1.update;
  print('speed'+speed)
  for (var n = 0; n < width+600; n += 400) {
    for(var m = 0; m < height+600; m += 200){
    push();
      
      
      translate(m,cos(noise(frameCount))*n);
      rotateRect();
    pop();
    }
  }

  //text title
  push()
     noStroke();
     textAlign(CENTER);
     textFont('Roboto');
     textSize(14);
     fill('#7f2f93');
     // text(hour(), width/2 - 180, 0);
     // text(minute(), width/2 +20, 0);
     text('Creative Coding Final Project | Yucheng Yin | yy2885@nyu.edu', width/2, height-80);
  pop()

}

function rotateRect(){
  
  for (var n = 0; n < width+600; n += 200) {
    fill(noise(frameCount)*255,map(n, 0, width, 0, 100),255,30);
    //var x1 = map(mouseX, 0, width, 0, PI);
   // rotate(PI/60)
    noStroke();
    rect(0,0,100*speed,400*speed);
  }
}
