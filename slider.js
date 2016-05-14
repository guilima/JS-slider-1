var slideItem = document.querySelectorAll(".slides li"),
		itemLen = slideItem.length,
		slide = slideItem[0].parentElement,
		setElem = slide.parentElement,
		navBtn = document.querySelectorAll(".flex-control-nav a"),
		currentItem,
		screenW= setElem.offsetWidth;

function onWindowResize() { 
	screenW = setElem.offsetWidth;
	var resizedItem = currentItem * screenW;
	
	slide.style.transition = '0s';
	slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
	
	setSize();
}

function setSize() { 
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

navMoves();
setSize();
window.addEventListener( 'resize',onWindowResize, false);
