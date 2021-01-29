
let faceapi;
let video;
let detections;
let easing = 0.07;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    createCanvas(windowWidth, windowHeight);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width / 2, height);
    video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);

		bg = createImg('images/bg.jpg', imageReady)
		bg.hide();
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function imageReady(x, y, scaler) {
	var scale = scaler * scaler / 1.8;

	var bgWidth = width  * scale / 2;
	var bgHeight = height * scale / 2;

	let bgposx = floor(x + windowWidth / 2 - bgWidth / 2 - 250);
	let bgposy = floor(windowHeight / 2 - bgHeight / 2 - y + 250);

	image(bg, bgposx, bgposy, bgWidth, bgHeight);
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    detections = result;

    background(24, 21, 21);
    //image(video, 0,0, width / 2, height)
    if (detections) {
        if (detections.length > 0) {
						imageReady(
              detections[0].alignedRect._box._x,
              detections[0].alignedRect._box._y,
              detections[0].alignedRect._box._width * 0.01)
        }
    }
    faceapi.detect(gotResults)
}
