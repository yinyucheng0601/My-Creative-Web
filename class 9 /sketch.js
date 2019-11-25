// image variables
//source:https://p5js.org/examples/dom-video-pixels.html(Load a video, manipulate its pixels and draw to canvas.)


var threshold = 20; //255 is white, 0 is black
var aveX, aveY, video; //this is what we are trying to find
var objectR = 177;
var objectG = 170;
var objectB = 70;
var debug = true;
var capture;

// Create an <video> element to play the video stream
function playStream(stream) {
  // Handle incoming video
  if(stream.getVideoTracks().length) {
    console.log("Initialize video track...")
    var video = document.createElement('video')
    video.autoplay = true
    document.getElementById('videos').appendChild(video)
    video.srcObject = stream
  } 
}

// initialize Peer.js real-time connection
initPeer(
  // called on initial connection (on Peer.js initialization)
  function onConnection(myPeerId) {
    console.log("MY ID", myPeerId)
  },

  // called on incoming data messages (every message)
  function onData(message, peerId) {
    console.log("ON DATA", message, peerId)
  },

  // called on incoming media stream connections (on connection)
  // for local media stream, peerId is `undefined`
  function onMediaStream(stream, peerId) {
    // stream is an instance of the MediaStream class
    // it contains both audio and video streaming tracks
    // Here's the documentation: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
    
    if(peerId) {
      console.log("ON REMOTE STREAM", peerId, stream)
    } else {
      console.log("ON LOCAL STREAM", stream)
    }

    // Play the stream
    playStream(stream)
    drawing(stream);

  }, {
    // id: 'YOUR_UNIQUE_ID',
    video: true,
    audio: false
  }
)


// function setup() {
// 	createCanvas(windowWidth, windowHeight);
//   // set up video things

//   capture=createCapture(function(stream) {
//     console.log(stream);
//   });
//   capture.hide();
// }

function setup() {
	createCanvas(windowWidth, windowHeight);
	// set up video things
    capture = createCapture(VIDEO);
  //video = document.createElement('video')
  //capture.size(height,width);
	capture.hide();
	frameRate(60);
}


function drawing(stream) {
  if(stream.getVideoTracks().length) {
    console.log("Initialize video track...")

    //capture.srcObject = stream

    capture.loadPixels();

    var totalFoundPixels = 0; //we are going to find the average location of change pixes so
    var sumX = 0; //we will need the sum of all the x find, the sum of all the y find and the total finds
    var sumY = 0;

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
    console.log(111)
    image(capture, 0, 0);  

    if (totalFoundPixels > 0) {
      // average location of pixels
      aveX = sumX / totalFoundPixels;
      aveY = sumY / totalFoundPixels;
      fill(objectR,objectB,objectG);
      noStroke()
      ellipse(width-2*aveX,2*aveY, 30, 30);		
    }
  } 
}

 