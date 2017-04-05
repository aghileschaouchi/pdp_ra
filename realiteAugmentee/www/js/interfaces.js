//	Flags to allow or not multiple specified interfaces.
var specifiedInterfacesFlag = true;
var specifiedInterfacesFlagFlag = false;

//	To detect if the ArUcoButton dimensions are relative or fix.
var ArUcoButtonMode = "relative";

//----------------------------------------------------------------------
//	showInterface(x,xMax,y,yMax,interfaceId,buttonId)
//			Show the "div" which will contain both of ArUcoButton &
//			the soecified interface to the materiel.
//			The "div" take the marker coordinates.
//----------------------------------------------------------------------
function showInterface(x,xMax,y,yMax,interfaceId,ArUcoButtonId){

	var lampInterface = document.getElementById(interfaceId);
	lampInterface.style.left = x + "px";
	lampInterface.style.top = y + "px";
	lampInterface.style.display = "inline";   
	showArUcoButton(x,xMax,y,yMax,ArUcoButtonId);
	console.log("Show Div, ID= " + interfaceId+". First display ArUcoButton, ID= "+ArUcoButtonId);

}

//----------------------------------------------------------------------
//	hideInterface(id)
//			hide the "div" which contain both of ArUcoButton &
//			the soecified interface to the materiel.
//---------------------------------------------------------------------- 
function hideInterface(interfaceId){

	var lampInterface = document.getElementById(interfaceId);
	lampInterface.style.display = "none";
	console.log("Hide Div " + interfaceId);

}

//----------------------------------------------------------------------
//	showArUcoButton()
//			Show a button as long as its marker 
//			is visible on the video streams.
//			The button take the marker coordinates,
//			and its dimensions are relative to the marker's  
//----------------------------------------------------------------------
function showArUcoButton(x,xMax,y,yMax,ArUcoButtonId){

	if(ArUcoButtonMode == "relative"){

		var btn = document.getElementById(ArUcoButtonId);
		btn.style.left = x + "px";
		btn.style.top = y + "px";
		var dim = Math.abs( yMax - y);
		if( dim >= 100){
			btn.style.width = dim + "px";
			btn.style.height = dim + "px";
		}
		else{
			btn.style.width = "100px";
			btn.style.height = "100px";
		}
	}else if(ArUcoButtonMode == "fix"){

		var btn = document.getElementById(ArUcoButtonId);
		btn.style.left = x + "px";
		btn.style.top = y + "px";
		btn.style.width = "100px";
		btn.style.height = "100px";
	}
	console.log("Show ArUco buttoon, ID= " + ArUcoButtonId);

}

//----------------------------------------------------------------------
//	hideArUcoButton(id)
//			Hide a button when its marker 
//			is no more visible on the video streams.
//			A button have the same id as its marker.
//---------------------------------------------------------------------- 
function hideArUcoButton(ArUcoButtonId){

	var btn = document.getElementById(ArUcoButtonId);
	btn.style.display = "none";
	console.log("Hide ArUco buttoon, ID= " + ArUcoButtonId);

}

//----------------------------------------------------------------------
//	showSpecifiedInterface(ArUcoButtonId,interfaceId)
//			When the ArUco button (id == 'ArUcoButtonId') is hitted a spécified 
//          interface (id == 'interfaceId') to the materiel will appear. 
//----------------------------------------------------------------------
function showSpecifiedInterface(ArUcoButtonId,SpecifiedInterfaceId){

	if(specifiedInterfacesFlag){
		var lampInterface = document.getElementById(SpecifiedInterfaceId);
		lampInterface.style.display = "inline";
		hideArUcoButton(ArUcoButtonId);
		specifiedInterfacesFlag = specifiedInterfacesFlagFlag;
		console.log("Show specified interface, ID= "+SpecifiedInterfaceId+". Hide the ArUcoButton, ID= "+ArUcoButtonId);
	}
}

//----------------------------------------------------------------------
//	ExitInterface()
//			Hide the interface and show its button.
//---------------------------------------------------------------------- 
function ExitSpecifiedInterface(SpecifiedInterfaceId,ArUcoButtonId){

	var btn = document.getElementById(SpecifiedInterfaceId);
	btn.style.display = "none";
	specifiedInterfacesFlag = true;
	var btn = document.getElementById(ArUcoButtonId);
	btn.style.display = "inline";
	console.log("Exit specified interface, ID= "+SpecifiedInterfaceId+". Return to the ArUcoButton, ID= ",ArUcoButtonId);

}



