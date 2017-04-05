//----------------------------------------------------------------------
//	doExit()
//			Exit the application, when Exit button is clicked.
//----------------------------------------------------------------------
function doExit(){

  getClient().disconnect();     
  navigator.app.exitApp();

}

//----------------------------------------------------------------------
// switchCamera()
//      Switch the device camera.
//----------------------------------------------------------------------
function switchCamera(){

  var type;
  if ( cameraType == "environment")
    type = "user";
  else if( cameraType == "user")
    type = "environment";

   if (streamSrc) {
    streamSrc.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  whichCamera(type);

}

//----------------------------------------------------------------------
//	AllowSpecifiedInterfaces()
//			Allow the appaearance of different specified interfaces.
//---------------------------------------------------------------------- 
function AllowSpecifiedInterfaces(){

	specifiedInterfacesFlagFlag = !specifiedInterfacesFlagFlag;

}

//----------------------------------------------------------------------
//  FixArUcoButtonDimension()
//      by default, the ArUcoButton dimensions are relative to 
//      those of the associted marker.
//      Calling this function make the ArUcoButton dimensions fix (100px,100px).
//---------------------------------------------------------------------- 
function FixArUcoButtonDimension(){
  if(ArUcoButtonMode == "relative")
    ArUcoButtonMode = "fix";
  else if(ArUcoButtonMode == "fix")
    ArUcoButtonMode = "relative";

}
