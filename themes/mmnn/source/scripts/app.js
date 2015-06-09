/**
 *
 * Created by drake on 6/3/15.
 */

$(document).ready(function() {
	backToTop();
	visibilityChage();

});

// 当用户离开这个tab时，改变title
function visibilityChage() {
	document.addEventListener('visibilitychange', function() {
		document.title = document.hidden ? '记得回来哦:D' : 'Code My Life';
	})	;
}

// back to top button
function backToTop() {
	var offset = 10,
		$scrollTopDuration = 700,
		$backToTop = $('.back-to-top');

	$(window).scroll(function() {
		$(this).scrollTop() > offset ?
			$backToTop.addClass('is-visible') :
			$backToTop.removeClass('is-visible');
	});

	$backToTop.on('click', function(e) {
		e.preventDefault();

		$('body, html').animate({
			scrollTop: 0
		}, $scrollTopDuration);
	});
}
