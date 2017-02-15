
//Pour afficher un button sur le flux video 
//Pour l'instant un seul button celui d'une lampe (id = 10)
function showButton(x,xMax,y,yMax){
	var btn = document.getElementById("lampe");
          btn.style.left = x + "px";
          btn.style.top = y + "px";
          btn.style.width =  "100px";
          btn.style.height = "100px";
          btn.style.display = "inline";   
}

//Pour cacher les buttons 
function hideButton(id){
	var btn = document.getElementById(id);
        btn.style.display = "none";
}
