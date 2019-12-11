
// image variables
var threshold = 20; //255 is white, 0 is black
var aveX, aveY, video; //this is what we are trying to find
var objectR =255, objectG = 255, objectB = 255, randomcolor;
var debug = true;
var capture, canvas;
var center;


// function getColor(){ 
// 	return "hsl(" + 360 * Math.random() + ',' +
// 			   (25 + 70 * Math.random()) + '%,' + 
// 			   (85 + 10 * Math.random()) + '%)'
//   }
  

  
//   // Generate 20 colors
//   for( var i = 20; i--; ){
// 	var item = document.createElement('div')
// 	item.style.cssText = `
// 	  display:inline-block; 
// 	  padding: 2em;
// 	  margin:5px; 
// 	  border-radius:50%;
// 	  background: ${getColor()};
// 	`
// 	document.body.appendChild(item);
//   }

function screenshot(){

	var dataUrl = canvas.toDataURL();
	window.open(dataUrl, "toDataURL() image");
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch');
	// set up video things
	capture = createCapture(VIDEO);
	capture.hide();
	frameRate(60);
	
	//randomcolor = "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)';
	
}

function draw() {
	//capture.get(capture.width/2,capture.heught/2);

	capture.loadPixels();

	var totalFoundPixels = 0; //we are going to find the average location of change pixes so
	var sumX = 0; //we will need the sum of all the x find, the sum of all the y find and the total finds
	var sumY = 0;

	// let x, y, d; // set these to the coordinates
	// let off = ((2 * capture.width + 2) * 4)
	// let components = [
	// pixels[off],
	// pixels[off + 1],
	// pixels[off + 2],
	// pixels[off + 3]
	// ];
	// print(components);
	

	//enter into the classic nested for statements of computer vision
	for (var row = 0; row < capture.height; row++) {
		for (var col = 0; col < capture.width; col++) {
			//the pixels file into the room long line you use this simple formula to find what row and column the sit in 

			var offset = (row * capture.width + col) * 4;
			//pull out the same pixel from the current frame 
			var thisColor = capture.pixels[offset];

			//pull out the individual colors for both pixels
			var r = capture.pixels[offset];
			var g = capture.pixels[offset + 1];
			var b = capture.pixels[offset + 2];

			//in a color "space" you find the distance between color the same whay you would in a cartesian space, phythag or dist in processing
			var diff = dist(r, g, b, objectR, objectG, objectB);

			if (diff < threshold) { //if it is close enough in size, add it to the average
				sumX = sumX + col;
				sumY = sumY + row;
				totalFoundPixels++;
				//if (debug) video.pixels[offset] = 0xff000000;//debugging
			}
		}
	}
	capture.updatePixels();
  
	//image(capture, 0, 0); 
	//console.log(objectR,objectG,objectB);
	
	const msg = {
		totalFoundPixels,
		sumX,
		sumY,
		objectR,
		objectB,
		objectG
	}

	if (totalFoundPixels > 0) {
		handleDraw(msg)
		sendMessage({ ...msg, event: 'DRAW' });
	}
}

function handleDraw({ totalFoundPixels, sumX, sumY, objectR, objectB, objectG }) {
	// average location of pixels
	aveX = sumX / totalFoundPixels;
	aveY = sumY / totalFoundPixels;
	fill(objectR,objectG,objectB, 60);
	noStroke()
	var r = Math.random()*50;
	ellipse(width-2*aveX,2*aveY, r, r);	
}

function handleSendMessage(message) {
	sendMessage({ event: 'MESSAGE', msg: message })
}