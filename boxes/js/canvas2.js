
//this is a clock

function drawing2(c){
    c.background(0)

    mySound2.update = amp.getLevel();
    var speed = mySound2.update;
   // push()
        c.noFill();
        c.stroke(255);
        c.strokeWeight(1 + 2*second());

        // c.beginShape();
        // for(var w = -20; w <width +20; w += 5){
        //     var h = height/2;
        //     h += 200 * sin(w* 0.001 + frameCount * PI /15);
        //     curveVertex(w, h);
        //     }
        // c.endShape();

  //  pop()



    // push()
     
        c.beginShape();
            for(var i=0;i<=6;i++){       
                var r=400;
                var delta = (360/6)
                //var pan = delta+ noise(frameCount/100)*50
                var pan = delta+ speed*50
                var angle1 = i*delta + frameCount/5+pan
                c.vertex(r*cos( radians(angle1) ),r*sin(radians(angle1)))
            }
        c.endShape(CLOSE);

//a clock
  
    
}