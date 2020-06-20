document.querySelector("#ham").addEventListener("click",function(){
	console.log("hi");
	document.querySelector(".navbar").classList.add("new");
	document.querySelector(".navbar").style.left="0";
	console.log(document.querySelector(".nav_link"))
	document.querySelector(".App-feauture").style.display="none";
	
})

document.querySelector("#close").addEventListener("click",function(){
	console.log("hi");
	document.querySelector(".navbar").classList.remove("new");
	document.querySelector(".App-feauture").style.display="flex";
	document.querySelector(".navbar").style.left="-200px";
})

document.querySelector(".li").addEventListener("click",function(){
	document.querySelector(".App-feauture").style.display="flex";

})