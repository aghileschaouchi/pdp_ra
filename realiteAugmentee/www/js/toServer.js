//----------------------------------------------------------------------
//  lampOn()
//        Send a request to the server  in order to turn On a lamp.
//----------------------------------------------------------------------
function lampOn(id,materielName,order) {

   //	Use the below if you want to publish to a topic on connect
   message = new Paho.MQTT.Message(order);
   message.destinationName = getTopicName();
   getClient().send(message);
   console.log("Mesage sent : "+order);

}

//----------------------------------------------------------------------
//  lampOff()
//        Send a request to the server  in order to turn Off a lamp.
//----------------------------------------------------------------------
function lampOff(id,materielName,order) {
	
   //	Use the below if you want to publish to a topic on connect
   message = new Paho.MQTT.Message(order);
   message.destinationName = getTopicName();
   getClient().send(message);   
   console.log("Mesage sent : "+order);

}

//----------------------------------------------------------------------
//  testRequestLamp()
//			To test how much time it takes while 
//			communicating with the server.
//----------------------------------------------------------------------
function testRequestLamp(id,materielName,order){

	if(order == "ON"){

	    var startRequest = performance.now();
	    
	    lampOn(id,materielName,order);

	    var endRequest = performance.now();
	    console.log("Time to "+order+" request  :" + (endRequest - startRequest) + " milliseconds.");

	}else if(order == "OFF"){

	    var startRequest = performance.now();
	    
	    lampOff(id,materielName,order);

	    var endRequest = performance.now();
	    console.log("Time to "+order+" request  :" + (endRequest - startRequest) + " milliseconds.");

	}
}