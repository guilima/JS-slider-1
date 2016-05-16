var slideItem = document.querySelectorAll(".slide"),
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
	slide.style.marginLeft = "-"+resizedItem;
	
	setSize();
}

function setSize() { 
	slideItem = document.querySelectorAll(".slides li");
	for (var i = 0; i < itemLen+1; i++) {
		slideItem[i].style.width = screenW + 'px';
	}
}

function navMoves() { 
	navBtn[0].style.background = 'red';
	for (var i = 0; i < itemLen; i++) {
		(function(index){
			navBtn[i].attachEvent('onclick', function(e){
				var target = e.target || e.srcElement;
				window.clearInterval(intervalID);
				currentItem = index,
				resizedItem = currentItem * screenW;		
				for (var j = 0; j < itemLen; j++) {
					navBtn[j].style.background = '';
				}
				target.style.background = 'grey';				
				slide.style.transition = '0.35s ease-out';
				slide.style.marginLeft = "-"+resizedItem;
			});
		})(i);
	}
}

function autoPlay() {
	currentItem < itemLen ? currentItem++ : currentItem = 1;
	resizedItem = currentItem * screenW;
	
	for (var i = 0; i < itemLen; i++) {
		navBtn[i].style.background = 'grey';		
	}	
	if (currentItem == itemLen) {
		navBtn[0].style.background = 'red';
	} else {
		navBtn[currentItem].style.background = 'red';
	}
	slide.style.transition = '0.35s ease-out';
	slide.style.marginLeft = "-"+resizedItem;
}

function transitionEnd(e) {
	if(currentItem== itemLen){
		e.target.style.transition = '0s ease-out';
		e.target.style.transform = "translate3d(0px, 0px, 0px)";
	}
}


navMoves();
setSize();
window.attachEvent( 'onresize',onWindowResize);
var intervalID = window.setInterval(autoPlay, 5500);
//slide.addEventListener("transitionend", transitionEnd, false);
