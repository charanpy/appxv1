const btn=document.querySelector('.action');
btn.addEventListener("click",function(){
	btn.classList.add("disappear");
	document.querySelector('.svg').classList.add("move");

});