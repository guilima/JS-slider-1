var slideItem = document.querySelectorAll(".slides li"),
		slide = slideItem[0].parentElement,
		setElem = slide.parentElement,
		navBtn = document.querySelectorAll(".flex-control-nav a"),
		btnIndex,
		screenW= setElem.offsetWidth;

function onWindowResize() { 
	screenW = setElem.offsetWidth;
	var resizedItem = btnIndex * screenW;
	
	slide.style.transition = '0s';
	slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
	
	setSize();
}


function setSize() { 
	for (var i = 0, leni = slideItem; i < leni.length; i++) {
		slideItem[i].style.width = screenW + 'px';
	}
}

function navMoves() { 
	navBtn[0].style.background = 'red';
	for (var x = 0, lenx = navBtn; x < lenx.length; x++) {
		(function(index){
			navBtn[x].addEventListener('click', function(e){
				for (var j = 0, lenj = navBtn; j < lenj.length; j++) {
					navBtn[j].removeAttribute('style');
				}
				e.target.style.background = 'red';
				
				btnIndex = index,
				btnIndex2 = btnIndex * screenW;
				slide.style.transition = '0.25s ease-out';
				slide.style.transform = "translate3d(-"+btnIndex2+"px, 0px, 0px)";
			});
		})(x);
	}
}


navMoves();
setSize();
window.addEventListener( 'resize',onWindowResize, false);



	