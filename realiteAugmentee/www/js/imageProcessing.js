//  Global variables.
var video, canvas, context, snappedImage, arucoDetector, client, clientOptions, topicName, timerLamp;
//----------------------------------------------------------------------
//  onLoad()
//        The main function.
//----------------------------------------------------------------------
function onLoad(){
  //-----------------------Server/Client------------------------------------------//
  //  Using the HiveMQ public Broker, with a random client Id
  //  If the broker : "broker.hivemq.com" is down then use "test.mosquitoo.org"
  //  on the port : 8080
  var brokerName = "broker.hivemq.com"; // MQTT webSocket enabled broker
  var wsport = 8000 ;// port for above
  topicName = 'pdp_ra/lamp/';

  // Initialize the client,
  client = new Paho.MQTT.Client(brokerName, wsport,"myclientid_"+ parseInt(Math.random() * 100, 10));

  client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
  };

  client.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
  };
  clientOptions = {
    timeout: 3,

    onSuccess: function () {
      console.log("mqtt connected");
      // Connection succeeded; subscribe to our topic, you can add multile lines of these
      client.subscribe(topicName, {qos: 0});
      document.getElementById("headerTitle").innerHTML = "Connection Established";
      console.log('Connection established');  
    },

    onFailure: function (message) {

      document.getElementById("headerTitle").innerHTML = "Connection Failed";
      console.log("Connection failed: " + message.errorMessage);
    }
  };

  //  Connect to the server.
  //  If failure : Exit the application.
  //  Else : launch the application. 
  client.connect(clientOptions);
  
  //-----------------------Image Processing------------------------------------------//
  video = document.querySelector('video');
  canvas = document.querySelector('canvas');
  context = canvas.getContext("2d");

  // Initialise the canvas
  // The canvas take the current window dimension.
  // The window which contains the WebView.
  canvas.width = parseInt(window.innerWidth);
  canvas.height = parseInt(window.innerHeight);

  if (hasGetUserMedia()) { 
    //  Description on js/tools;js        
    whichCamera("environment");

    //  Intialliasing the Aruco detector. 
    arucoDetector = new AR.Detector();
    requestAnimationFrame(detectArUcoMarkers);

    
  } else {
    alert('WebRTC-getUserMedia() is not supported in your device');
    navigator.app.exitApp();
  }
  //  Description on js/tools;js        
  rotationListener();
} 

//----------------------------------------------------------------------
//  getClient()
//        return the client variabl.
//----------------------------------------------------------------------
function getClient(){
  return client;
}

//----------------------------------------------------------------------
//  getTopicName()
//        return the client variabl.
//----------------------------------------------------------------------
function getTopicName(){
  return topicName;
}

//----------------------------------------------------------------------
//  hasGetUserMedia()
//        First, we check that the device browser supports the WebRTC API.
//----------------------------------------------------------------------
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

//----------------------------------------------------------------------
//  JS-ArUco : detectArUcoMarkers() [CHANGED]
//      The screenshot taken by snapshot() will be analysed here,
//      in order to detect Aruco markers.
//      
//      [Begin CHANGED]
//      I.Function name from tick() to detectArUcoMarkers().
//      II.If no known ArUco marker is present on the video stream
//      then its ArUcoButton will disappear.
//      [End CHANGED]
//----------------------------------------------------------------------
function detectArUcoMarkers(){
  requestAnimationFrame(detectArUcoMarkers);
  if (video.readyState === video.HAVE_ENOUGH_DATA){
    snapshot();

    //  [Begin CHANGED]

    //  The lamp interface will disappear if there is its marker
    //  is no more present on the video stream.
    //  hideInterface() : description on www/js/interfaces.js
    for(var i = 0; i < interfacesData.length; i++)
      hideInterface(interfacesData[i].interfaceId);

    //  [End CHANGED]
    //  To test how much it takes per frame,
    //  and how much it takes to detect a marker.
    var startFrame = performance.now();

    var markers = arucoDetector.detect(snappedImage);
    delete snappedImage;
    drawCorners(markers);
    drawId(markers);

    var endframe = performance.now();
    console.log("Time per frame : " + (endframe - startFrame) + " milliseconds.");
  }
}

//----------------------------------------------------------------------
//  JS-ArUco Library: snapshot() [Nothing CHANGED]
//      It takes screenshots each instant.
//----------------------------------------------------------------------
function snapshot(){
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  snappedImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

//----------------------------------------------------------------------
//  JS-ArUco Library: drawCorners(markers) [Nothing CHANGED]
//      Here we draw red corners for each Aruco marker
//      present on the video stream.
//----------------------------------------------------------------------
function drawCorners(markers){
  var corners, corner, i, j;

  context.lineWidth = 3;

  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;
    
    context.strokeStyle = "red";
    context.beginPath();
    
    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];
      context.moveTo(corner.x, corner.y);
      corner = corners[(j + 1) % corners.length];
      context.lineTo(corner.x, corner.y);
    }

    context.stroke();
    context.closePath();
    
    context.strokeStyle = "green";
    context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
  }
}

//----------------------------------------------------------------------
//  JS-ArUco Library: drawId(markers) [CHANGED]
//      Here we draw the ID for each Aruco marker
//      present on the video stream.
//      [Begin CHANGED]
//      An ArUcoButton will be associted to each known ArUco marker 
//      on the database.
//      [End CHANGED]
//----------------------------------------------------------------------
function drawId(markers){
  var corners, corner, x, y, i, j;

  //  [Begin CHANGED]
  var xMax,yMax;
  //  [End CHANGED]

  context.strokeStyle = "blue";
  context.lineWidth = 1;
  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;
    x = Infinity;
    y = Infinity;

    //  [Begin CHANGED]
    xMax = 0 ;
    yMax = 0 ;
    //  [End CHANGED]

    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];
      
      x = Math.min(x, corner.x);
      y = Math.min(y, corner.y);

      //  [Begin CHANGED]
      xMax = Math.max(x, corner.x);
      yMax = Math.max(y, corner.y);

      //  showInterface() Description on : /js/interfaces.js
      //  We use "markers[i].id" as an index to retrieve interfaces data.
      //  The interfaces data are saved on the order.
      if( markers[i].id < interfacesNumber )
        showInterface(x,xMax,y,yMax,interfacesData[markers[i].id].interfaceId,interfacesData[markers[i].id].ArUcoButtonId);

      //  [End CHANGED]
    }
    context.strokeText(markers[i].id, x, y);

    //  [Begin CHANGED]
    console.log("Marker ID = "+markers[i].id);
    //  [End CHANGED]

  }
}