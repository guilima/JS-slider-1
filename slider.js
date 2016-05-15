var slideItem = document.querySelectorAll(".slides li:not(.clone)"),
	itemLen = slideItem.length,
	slide = slideItem[0].parentElement,
	setElem = slide.parentElement,
	navBtn = document.querySelectorAll(".slides-control-nav a"),
	currentItem = 0,
	screenW= setElem.offsetWidth;

function onWindowResize() { 
	screenW = setElem.offsetWidth;
	var resizedItem = currentItem * screenW;
	
	slide.style.transition = '0s';
	slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
	
	setSize();
}

function setSize() { 
	slideItem = document.querySelectorAll(".slides li");
	for (var i = 0; i < itemLen; i++) {
		slideItem[i].style.width = screenW + 'px';
	}
}

function navMoves() { 
	navBtn[0].style.background = 'red';
	for (var i = 0; i < itemLen; i++) {
		(function(index){
			navBtn[i].addEventListener('click', function(e){
				currentItem = index,
				resizedItem = currentItem * screenW;
				for (var j = 0; j < itemLen; j++) {
					navBtn[j].removeAttribute('style');
				}
				e.target.style.background = 'red';				
				slide.style.transition = '0.25s ease-out';
				slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
			});
		})(i);
	}
}

function autoPlay() {
	currentItem < itemLen ? currentItem++ : currentItem = 1;
	resizedItem = currentItem * screenW;
	
	for (var i = 0; i < itemLen; i++) {
		navBtn[i].style.background = '';		
	}	
	if (currentItem == itemLen) {
		navBtn[0].style.background = 'red';
	} else {
		navBtn[currentItem].style.background = 'red';
	}
	slide.style.transition = '0.35s ease-out';
	slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
}

function transitionEnd(e) {
	if(currentItem== itemLen){
		e.target.style.transition = '0s ease-out';
		e.target.style.transform = "translate3d(0px, 0px, 0px)";
	}
}


navMoves();
setSize();
window.addEventListener( 'resize',onWindowResize, false);
var intervalID = window.setInterval(autoPlay, 5500);
slide.addEventListener("transitionend", transitionEnd, false);
