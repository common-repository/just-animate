jQuery(document).ready(function($) {
    
    function elementFromTop(elem, classToAdd, distanceFromTop, unit) {
        elem.each(function() {
            var winY = window.innerHeight || document.documentElement.clientHeight,
            distTop = $(this)[0].getBoundingClientRect().top,
		    distPercent = Math.round((distTop / winY) * 100),
		    distPixels = Math.round(distTop),
		    distUnit;
            distUnit = unit == 'percent' ? distPercent : distPixels;
            //console.log(distTop + ' ' +distanceFromTop);
            if (distUnit <= distanceFromTop) {
                $(this).addClass(classToAdd);
            }
        });
    }
    
	$(window).on('scroll', function() {
        // params:  trigger element, classes to add to target element, distance from top, unit ('percent' or 'pixels')
		elementFromTop($('.sigja_ja'), 'sigja_animate', 50, 'percent');
	});

});
