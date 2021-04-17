$(function() {
	$('.nav-top').animate({
		top: '0'
	}, 1000, function() {
		$('.nav-right').animate({
			left: '1450px'
		}, 1000);
	});
	//滚动事件
	$(window).scroll(function() {
		if ($(this).scrollTop() > $('.banner').offset().top) {
			$('.nav-top').css({
				position: 'fixed',
				top: '0',
				left: '0',
				background: '#aaa'
			})
		} else {
			$('.nav-top').css({
				position: 'absolute',
				top: '0',
				left: '0',
				background: 'transparent'
			})
		}
		if ($(this).scrollTop() > $('.cirs').offset().top / 2) {
			$('.content-left').animate({
				width: '768px',
				height: '512px'
			}, 1000)
			$('.content-right').animate({
				width: '337px'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.container').offset().top) {
			$('.content-left1').animate({
				height: '512px'
			}, 2000)
			$('.content-right1').animate({
				height: '426px'
			}, 1000)
		}
		if ($(this).scrollTop() > $('.con3-main').offset().top - 600) {
			$('.con3-main').animate({
				height: '764px'
			}, 2000)
		}
		if ($(this).scrollTop() > $('.container5').offset().top - 600) {
			$('.con5-left').animate({
				top: '0'
			}, 500, function() {
				$('.con5-right').animate({
					top: '0'
				}, 500);
			})
		}
		if ($(this).scrollTop() > $('.container').offset().top) {
			$('.fixed-nav').css('display', 'block');
		} else {
			$('.fixed-nav').css('display', 'none');
		}

	})

	$('.nav>a>li').mouseenter(function() {
		$(this).css({
			color: 'orange'
		});
	})
	$('.nav>a>li').mouseleave(function() {
		if ($(this).parent().index() != 1) {
			$(this).css({
				color: 'white'
			});
		}

	})

	//轮播函数
	var num = 0;

	function run() {
		if (flag) {
			flag = false;
			num++;
			if (num > 2) {
				num = 0;
			}
			$('.cirs li').eq(num).css({
				background: 'white',
				boxShadow: '0 0 15px #000'
			}).siblings().css({
				background: '#000',
				boxShadow: 'none'
			});
			$('.banner-img>img').eq(num).animate({
				opacity: '1'
			}, 1000).siblings().animate({
				opacity: '0'
			}, 1000, function() {
				flag = true;
			});
		}
	}
	// 轮播图
	var time = setInterval(run, 3000);
	$('.cirs').mouseover(function() {
		clearInterval(time);
	})
	$('.cirs').mouseout(function() {
		time = setInterval(run, 3000);
	})
	// 小圆点点击事件
	var flag = true;
	$('.cirs>li').click(function() {
		if (flag) {
			flag = false;
			num = $(this).index();
			// console.log(num);
			$('.cirs li').eq(num).css({
				background: 'white',
				boxShadow: '0 0 15px #000'
			}).siblings().css({
				background: '#000',
				boxShadow: 'none'
			});
			$('.banner-img>img').eq(num).animate({
				opacity: '1'
			}, 1000).siblings().animate({
				opacity: '0'
			}, 1000, function() {
				flag = true;
			});
		}
	})
	$('.expecial-p').mouseenter(function() {
		$(this).css({
			backgroundColor: 'black'
		});
	})
	$('.expecial-p').mouseleave(function() {
		$(this).css({
			backgroundColor: 'orange'
		});
	})

	var num1 = 0;
	var flag1 = true;

	function run1() {
		if (flag1) {
			flag1 = false;
			num1++;
			if (num1 >= 2) {
				num1 = 0;
			}
			$('.suite').animate({
				left: -280 * num1 + 'px'
			}, 500, function() {
				flag1 = true;
			}).delay(3000);
		}
	}
	var time2 = setInterval(run1, 1000);
	$('.suite,.btn-right,.btn-left').mouseover(function() {
		clearInterval(time2);
	})
	$('.suite').mouseout(function() {
		time2 = setInterval(run1, 1000);
	})
	// 滑动图点击

	$('.btn-left,.btn-right').click(function() {
		if (flag1) {
			flag1 = false;
			if (num1 == 0) {
				num1 = 1;
			} else {
				num1 = 0;
			}
			$('.suite').animate({
				left: -280 * num1 + 'px'
			}, 500, function() {
				flag1 = true;
			});
		}
	})

	$('.suite>li').mouseenter(function() {
		if (flag1) {
			flag1 = false;
			$(this).find('img').animate({
				width: '270px',
				height: '330px',
				left: '-10px',
				top: '-10px'
			}, 300, function() {
				flag1 = true;
			}).end().siblings().find('img').animate({
				width: '250px',
				height: '310px',
				left: '0px',
				top: '0px'
			}, 300)
		}
	})
	$('.suite').mouseleave(function() {
		if (flag1) {
			flag1 = false;
			$(this).parent().find('li').find('img').animate({
				width: '250px',
				height: '310px',
				left: '0px',
				top: '0px'
			}, 300, function() {
				flag1 = true;
			})
		}
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
	$('.expecial-p').click(function() {
		window.location.href = 'html/product.html'
	})
})
