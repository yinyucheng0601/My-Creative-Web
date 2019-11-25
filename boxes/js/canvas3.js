//


var nSeed=1
var nySeed=0
function drawing3(c){
    //c.background(0)
    var speed = mySound1.update;

	
if (mouseIsPressed) {
   // c.fill(255,50);
	c.fill(noise(frameCount)*255,map(mouseY, 0, width, 0, 100),255,30);
	c.noStroke();
	c.rect(noise(nSeed)*width-600, noise(nySeed)*height-600, 300*speed, 300*speed);
	
	nSeed += 0.01;
	nySeed += 0.02;
}

}