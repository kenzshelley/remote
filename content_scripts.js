function pausePlay(isPlay) {
	var videoTagElements = document.getElementsByTagName("video");
	if (videoTagElements.length != 0) {
		if (isPlay == true) {
			videoTagElements[0].play();
		} else {
			videoTagElements[0].pause();
		}		
	} else if (typeof ifp !== undefined) {
		if (isPlay == true) {	
			ifp.play();
		} else {
			ifp.pause();
		}
	} else {
		console.log("wrong move, try again");
	}
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Received message!");


  sendResponse("received the message!");
  return true;
});
	
