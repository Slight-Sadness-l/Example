$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > $('.container2').offset().top - 700) {
			$('.container2>.products>.products-right>p:nth-child(1)').animate({
				top: '0'
			}, 500, function() {
				$('.container2>.products>.products-right>p:nth-child(2)').animate({
					top: '0'
				}, 300, function() {
					$('.container2>.products>.products-right>p:nth-child(3)').animate({
						top: '0'
					}, 100);
				})
			})
			$('.container2>.products>.products-left').animate({
				left: '0'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.container3').offset().top - 700) {
			console.log($('.container3>.products-left'))
			$('.container3>.products>.products-right>p:nth-child(1)').animate({
				top: '0'
			}, 500, function() {
				$('.container3>.products>.products-right>p:nth-child(2)').animate({
					top: '0'
				}, 300, function() {
					$('.container3>.products>.products-right>p:nth-child(3)').animate({
						top: '0'
					}, 100);
				})
			})
			$('.container3>.products>.products-left').animate({
				left: '0'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.container4').offset().top - 700) {
			console.log($('.container4>.products-left'))
			$('.container4>.products>.products-right>p:nth-child(1)').animate({
				top: '0'
			}, 500, function() {
				$('.container4>.products>.products-right>p:nth-child(2)').animate({
					top: '0'
				}, 300, function() {
					$('.container4>.products>.products-right>p:nth-child(3)').animate({
						top: '0'
					}, 100);
				})
			})
			$('.container4>.products>.products-left').animate({
				left: '0'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.container5').offset().top - 700) {
			console.log($('.container5>.products-left'))
			$('.container5>.products>.products-right>p:nth-child(1)').animate({
				top: '0'
			}, 500, function() {
				$('.container5>.products>.products-right>p:nth-child(2)').animate({
					top: '0'
				}, 300, function() {
					$('.container5>.products>.products-right>p:nth-child(3)').animate({
						top: '0'
					}, 100);
				})
			})
			$('.container5>.products>.products-left').animate({
				left: '0'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.container').offset().top) {
			$('.fixed-nav').css('display', 'block');
		} else {
			$('.fixed-nav').css('display', 'none');
		}
	})
	$('.expecial-p').click(function() {
		window.location.href = 'product.html';
	})
	var flag2 = true;
	$('.fixed-nav>ul>li').mouseenter(function() {
		if (flag2) {
			flag2 = false;
			$(this).animate({
				right: '230px'
			}, function() {
				flag2 = true;
			}).css('background', 'orange').siblings().animate({
				right: '0'
			}).css('background', '#f1f1f1')
		}
	})
	$('.fixed-nav>ul').mouseleave(function() {
		$('.fixed-nav>ul>li').animate({
			right: '0'
		}, 100).css('background', '#f1f1f1');
	})
	var flag3 = true;
	$('.up').click(function() {
		if (flag3) {
			flag3 = false;
			$('html,body').animate({
				scrollTop: '0'
			}, 1000, function() {
				flag3 = true;
			});
		}

	})
})
