$(function() {
	var goods;
	$('.shop-left').mousemove(function(e) {
		$('.mask').css('display', 'block');
		$('.datu').css('display', 'block');
		// console.log(e.pageY-$(this).offset().top,e.pageX-$(this).offset().left);
		var x = e.pageX - $(this).offset().left - 50;
		var y = e.pageY - $(this).offset().top - 50;
		var xx = ($('.datu>img').width() - $('.datu').width()) / ($(this).width() - 100);
		var yy = ($('.datu>img').height() - $('.datu').height()) / ($(this).height() - 100);
		// console.log(xx,yy);
		if (x > $(this).width() - 100) {
			x = $(this).width() - 100;
		} else if (x < 0) {
			x = 0
		}
		if (y > $(this).height() - 100) {
			y = $(this).height() - 100;
		} else if (y < 0) {
			y = 0
		}
		$('.mask').css({
			top: y + 'px',
			left: x + 'px'
		});
		$('.datu>img').css({
			top: -y * yy + 'px',
			left: -x * xx + 'px'
		});
	})
	$('.shop-left').mouseleave(function() {
		$('.mask').css('display', 'none');
		$('.datu').css('display', 'none');
	})
	$('.width1').click(function() {
		$(this).css({
			color: '#f9b418',
			border: '1px solid #f9b418'
		}).siblings().css({
			color: 'rgb(102,102,102)',
			border: '1px solid rgb(102,102,102)'
		})
	})

	if (window.sessionStorage.getItem('num') == null) {
		window.sessionStorage.setItem('num', '0');
	}
	var num1 = parseInt(window.sessionStorage.getItem('num'));

	var num = 0;
	num = parseInt($('.num').html());
	$('.reduce').click(function() {
		num = parseInt($('.num').html());
		num--;
		if (num < 1) {
			num = 1
		}
		$('.num').html(num);
	})
	$('.add').click(function() {
		num = parseInt($('.num').html());
		num++;
		$('.num').html(num);
	})
	$('.reproducts>li').click(function() {
		$('.shop-left>img').attr('src', $(this).find('img').attr('src'));
		$('.title').html($(this).find('p').eq(0).find('span').html())
		$('.price').html($(this).find('p').eq(1).find('span').html())
		$('.datu>img').attr('src', $(this).find('img').attr('src'));
		$(document).scrollTop(0);
	})
	$('.click-btn').click(function() {
		if (!$('.go-num').html()) {
			$('.shopinfo').append(goods);
			num = parseInt($('.num').html());
			num1 += num;
			$('shopinfo').append(goods);
			$('.go-money').html($('.price').html());
			$('.go-num').html(num1);
			$('.shopinfoimg').attr('src', $('.shop-left>img').attr('src'));
		} else {
			num = parseInt($('.num').html());
			num1 += num;
		}
		$('.max-mask').css('display', 'block');
		$('.goshop').css('display', 'block');
		$('.goshop').animate({
			right: '0'
		}, 500);
		$('.go-money').html($('.price').html());
		$('.go-num').html(num1);
		$('.money').html($('.price').html() * num1);
		$('.shopinfoimg').attr('src', $('.shop-left>img').attr('src'));
		window.sessionStorage.setItem('src', $('.shopinfoimg').attr('src'));
		window.sessionStorage.setItem('num', num1);
		window.sessionStorage.setItem('title', $('.title').html());
		window.sessionStorage.setItem('price', $('.price').html());
	})
	$('.closeX').click(function() {
		$('.max-mask').css('display', 'none');
		$('.goshop').animate({
			right: '-300px'
		}, 500, function() {
			$('.goshop').css('display', 'none');
		});

	})
	$('.remove').click(function() {
		// window.sessionStorage.clear();
		num = parseInt($('.go-num').html());
		num1 -= num;
		$('.money').html('');
		window.sessionStorage.setItem('src', $('.shopinfoimg').attr('src'));
		window.sessionStorage.setItem('num', num1);
		window.sessionStorage.setItem('title', $('.title').html());
		window.sessionStorage.setItem('price', $('.price').html());
		goods = $('.goods-li').detach();
	})
	$('.addshop').click(function() {
		window.sessionStorage.setItem('src', $('.shopinfoimg').attr('src'));
		window.sessionStorage.setItem('num', num1);
		window.sessionStorage.setItem('title', $('.title').html());
		window.sessionStorage.setItem('price', $('.price').html());
	})
})
