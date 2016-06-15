(function(){
	'use strict';

	// vars
	var app = {
		slideItem: 		document.querySelectorAll(".slides li:not(.clone)"),
		itemLen: 		document.querySelectorAll(".slides li:not(.clone)").length,
		slide: 			document.querySelectorAll(".slides li:not(.clone)")[0].parentElement,
		setElem: 		document.querySelectorAll(".slides li:not(.clone)")[0].parentElement.parentElement,
		navBtn: 		document.querySelectorAll(".slides-control-nav a"),		
		screenW: 		document.querySelectorAll(".slides li:not(.clone)")[0].parentElement.parentElement.offsetWidth,
		currentItem: 	0,
	};


	// Initial Config
	var initialConfig = {

		// Start Functions
		init: function(){
			var self = this;
			self.navMoves();
			self.setSize();
			self.resize();
			self.startTransitionEnd();
		},

		// On Window Resize
		onWindowResize: function() { 
			app.screenW = app.setElem.offsetWidth;
			var resizedItem = app.currentItem * app.screenW;
			
			app.slide.style.transition = '0s';
			app.slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
			
			initialConfig.setSize();
		},

		// Resize
		resize: function(){
			window.addEventListener( 'resize', initialConfig.onWindowResize, false);
		},

		// Set Size
		setSize: function() {
			app.slideItem = document.querySelectorAll(".slides li");
			for (var i = 0; i < app.itemLen+1; i++) {
				app.slideItem[i].style.width = app.screenW + 'px';
			}
		},

		// Nav Moves
		navMoves: function() { 
			app.navBtn[0].style.background = 'red';
			for (var i = 0; i < app.itemLen; i++) {
				(function(index){
					app.navBtn[i].addEventListener('click', function(e){

						window.clearInterval(initialConfig.intervalID);
						var currentItem = index,
						resizedItem 	= currentItem * app.screenW;

						for (var j = 0; j < app.itemLen; j++) {
							app.navBtn[j].removeAttribute('style');
						}
						e.target.style.background = 'red';				
						app.slide.style.transition = '0.25s ease-out';
						app.slide.style.transform = "translate3d(-"+resizedItem+"px, 0px, 0px)";
					});
				})(i);
			}
		},

		// Interval ID
		intervalID: function() {
			window.setInterval(initialConfig.autoPlay, 5500);
		},

		// Auto Play
		autoPlay: function() {
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
		},

		// Transition End
		transitionEnd: function(e) {
			if(app.currentItem== app.itemLen){
				e.target.style.transition = '0s ease-out';
				e.target.style.transform = "translate3d(0px, 0px, 0px)";
			}
		},

		// Start Transition End
		startTransitionEnd: function() {
			app.slide.addEventListener("transitionend", initialConfig.transitionEnd, false);
		}
	};

    // Start
    initialConfig.init();

})();
