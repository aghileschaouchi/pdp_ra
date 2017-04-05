//----------------------------------------------------------------------
//  whichCamera(Type)
//    For smartphone or tablet :
//     Start the type={user,environment} camera.
//    For computer it's simple :
//      type = "computer".
//----------------------------------------------------------------------
var streamSrc, cameraType;
function whichCamera(type){

  var cameraFacing;
  cameraType = type;
  if( type == "user")
    cameraFacing = 0;
  else if( type == "environment")
    cameraFacing = 1;
  else if( type == "computer"){
    cameraFacing = 2;    
  }
  console.log(type+" index : "+cameraFacing);

  //  Here we list all media devices, in order to choose between
  //  the front and the rear camera.
  //      videoDevices[0] : user Camera
  //      videoDevices[1] : environment Camera
  //  Then set the video resolution.
  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    var videoDevices, videoDeviceIndex, constraints;
    //  Initialize the array wich will contain all video resources IDs.
    //  Most of devices have two video resources (Front & Rear Camera).
    videoDevices = [0,0];
    //  Simple index to browse the videa resources array (videoDevices).
    videoDeviceIndex = 0;
    //  devices.forEach(), this function will detect all media resources (Audio, Video) of the device 
    //  where we run the application.
    devices.forEach(function(device) {
      console.log(device.kind + ": " + device.label +
        " id = " + device.deviceId);
      // If the kind of the media resource is video, 
      if (device.kind == "videoinput") {  
        //  then we save it on the array videoDevices.
        videoDevices[videoDeviceIndex++] =  device.deviceId;   
        console.log(device.deviceId+" = "+videoDevices[videoDeviceIndex-1]);
      }
    });
    console.log("Camera facing ="+cameraFacing+" ID = "+videoDevices[videoDeviceIndex-1]);

    // Here we specified which camera we start,
    //  videoDevices[0] : Front Camera
    //  videoDevices[1] : Back Camera 
    if( cameraFacing != "computer"){
      constraints = { deviceId: { exact: videoDevices[cameraFacing]  }};
      return navigator.mediaDevices.getUserMedia({ video: 
                                                          constraints,
                                                          width: { min: 1280, ideal: 1600, max: 1920 },
                                                          height: { min: 720, ideal: 1200, max: 1080 } 
                                                  }
                                                );
    }else
      return navigator.mediaDevices.getUserMedia({ video: true });
    })
    //  Then we retrieve the link to the video stream.
    .then(stream => {
      if (window.webkitURL) {
        video.src = window.webkitURL.createObjectURL(stream);
        localMediaStream = stream;
        console.log(localMediaStream +" = "+ stream)
      } else if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
        console.log(video.mozSrcObject +" = "+ stream)
      } else if (video.srcObject !== undefined) {
        video.srcObject = stream;
        console.log(video.srcObject +" = "+ stream)
      } else {
        video.src = stream;
        console.log(video.src +" = "+ stream)
      }
      streamSrc = stream;
    })
    .catch(e => console.error(e));

}

//----------------------------------------------------------------------
// rotationListener()
//      Manage the screen rotation, by calculating and affecting 
//      new canvas width and height.
//----------------------------------------------------------------------
function rotationListener(){

  window.addEventListener("orientationchange", function() {
    switch (window.orientation) {
      case 0:
      canvas.width = parseInt(window.screen.width);
      canvas.height = parseInt(window.screen.height);
      this.screenOrientation = 'portrait';
      console.log("0° portrait, width = "+canvas.width+", height ="+canvas.height);
      break;
      case 90:
      canvas.width = parseInt(window.screen.width);
      canvas.height = parseInt(window.screen.height);
      this.screenOrientation = 'landscape';
      console.log("90° landscape, width = "+canvas.width+", height ="+canvas.height);
      break;
      case 180:
      canvas.width = parseInt(window.screen.width);
      canvas.height = parseInt(window.screen.height);
      this.screenOrientation = 'portrait';
      console.log("180° portrait, width = "+canvas.width+", height ="+canvas.height);
      break;
      case -90:
      canvas.width = parseInt(window.screen.width);
      canvas.height = parseInt(window.screen.height);
      this.screenOrientation = 'landscape';
      console.log("-90° landscape, width = "+canvas.width+", height ="+canvas.height);
      break;
      default:
      this.screenOrientation = 'Unknown';
      console.log("Unknown");
    } 
  }, false);

}   


