function drawing4(c){


	c.noFill();
	c.stroke(255);
	c.strokeWeight(10 + 5 * second());

	c.beginShape();
	for(var w = -20; w <width +20; w += 5){
		var h = height/2;
		h += 200 * sin(w* 0.001 + frameCount * PI /15);
		curveVertex(w, h);
		}
	c.endShape();


	 c.noStroke();
	 //textAlign(CENTER);
	 c.textFont('Arial','Helvetica');
	 c.textSize(120);
	 c.fill(255);
	 c.text(hour(), w/2 - 180, 350);
	 c.text(minute(), w/2 +20, 350);
	 c.text("：", w/2 - 40, 350);

}
