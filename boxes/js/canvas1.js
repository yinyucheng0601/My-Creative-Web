
//this is a 3D sketch using WEBGL


function drawing1(c){
  
    mySound1.update = amp.getLevel();
    mySound1.loop=true;
    var speed1 = mySound1.update/10;
    //c.print(mySound1.update)
    var x1 = map(mouseY, 0, height, 0, PI);
    c.background(0,30);
    c.translate(0, 0, cos(frameCount*0.001));
    
    push()

    
    c.rotateY(speed1);
    c.rotateX(speed1);
    c.rotateZ(speed1/2);
        
    c.stroke(255);

    c.noFill();
   
    c.beginShape();
        c.vertex(-100, -100, -100);
        c.vertex( 100, -100, -100);
        c.vertex(   0,    0,  100);

        c.vertex( 100, -100, -100);
        c.vertex( 100,  100, -100);
        c.vertex(   0,    0,  100);

        c.vertex( 100, 100, -100);
        c.vertex(-100, 100, -100);
        c.vertex(   0,   0,  100);

        c.vertex(-100,  100, -100);
        c.vertex(-100, -100, -100);
        c.vertex(   0,    0,  100);
    c.endShape();
    pop()    
  
  // push()
  //   c.translate(100, 100, -2*cos(frameCount/100));

  //   c.rotateY(angle);
  //   c.rotateX(angle);
  //   c.rotateZ(angle);
        
  //   c.stroke(255);

  //   c.noFill();
   
  //   c.beginShape();
  //       c.vertex(-100, -100, -100);
  //       c.vertex( 100, -100, -100);
  //       c.vertex(   0,    0,  100);

  //       c.vertex( 100, -100, -100);
  //       c.vertex( 100,  100, -100);
  //       c.vertex(   0,    0,  100);

  //       c.vertex( 100, 100, -100);
  //       c.vertex(-100, 100, -100);
  //       c.vertex(   0,   0,  100);

  //       c.vertex(-100,  100, -100);
  //       c.vertex(-100, -100, -100);
  //       c.vertex(   0,    0,  100);
  //   c.endShape();
  //   pop()  

    }