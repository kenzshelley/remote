"use strict";

function pause() {
console.log("Pause");
	var videoTagElements = document.getElementsByTagName("video");
	if (videoTagElements.length != 0) {
    videoTagElements[0].pause();
	} else if (typeof ifp !== undefined) {
    ifp.pause();
	} else {
		console.log("wrong move, try again");
	}
}

function play() {
  console.log("Play");
  var videoTagElements = document.getElementsByTagName("video");
  if (videoTagElements.length != 0) {
    videoTagElements[0].play();
  } else if (typeof ifp !== undefined) {
    ifp.play();
  } else {
    console.log("wrong move, try again");
  }
}

function volumeUp() {
  console.log("volume up");
	var vid = document.getElementsByTagName("video");
	if (vid.length != 0 & vid[0].volume <= .98) vid[0].volume += .02
}

function volumeDown() {
  console.log("volume down");
	var vid = document.getElementsByTagName("video");
	if (vid.length != 0 & vid[0].volume >= 0.02) vid[0].volume -= .02
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Received message!");
  console.log(request);

  let fn = window[request.function_name];
  console.log(fn);
  fn();

  sendResponse("received the message!");
  return true;
});
	
