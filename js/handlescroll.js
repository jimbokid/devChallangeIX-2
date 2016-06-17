var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}
DOMReady(function(){
	
	section = document.querySelector('.vs-section');
	sectionLetter = document.querySelector('.vs-section-slow');
	divs = document.querySelectorAll('.vs-transform');

	smoothScrollEase = 0.1;
	
	smooth = new Smooth({
		direction: 'vertical',
		section: section,
		ease: smoothScrollEase,
		//els: divs
	});
	setTimeout(function(){
		smooth.init();
	}, 500);

	if ($('.vs-section-slow').length) {
		smoothLetter = new Smooth({
			direction: 'vertical',
			section: sectionLetter,
			ease: 0.06,
		});
		setTimeout(function(){
			smoothLetter.init();
		}, 1200);
	}

	

});