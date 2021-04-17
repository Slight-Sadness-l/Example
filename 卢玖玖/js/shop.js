$(function() {
	$('.reduce').click(function() {
		var num = window.sessionStorage.getItem('num');
		num--;
		if (num < 1) {
			num = 1
		}
		$('.num').html(num);
		window.sessionStorage.setItem('num', num);
		$('.total-price').html(window.sessionStorage.getItem('price') * num);
	})
	$('.add').click(function() {
		var num = window.sessionStorage.getItem('num');
		num++;
		$('.num').html(num);
		window.sessionStorage.setItem('num', num);
		$('.total-price').html(window.sessionStorage.getItem('price') * num);
	})
	$('.delete').click(function() {
		window.sessionStorage.clear();
		$('.goods').detach();
		$('.total-price').html('');
		$('.kong').css('display', 'block');
	})
	if (window.sessionStorage.getItem('src') == null || window.sessionStorage.getItem('src') == 'undefined') {
		$('.goods').detach();
		$('.total-price').html('');
		$('.kong').css('display', 'block');
	} else {
		$('.kong').css('dispaly', 'none');
		$('.title1').html(window.sessionStorage.getItem('title'));
		$('.num').html(window.sessionStorage.getItem('num'));
		$('.price').html(window.sessionStorage.getItem('price'));
		$('.total-price').html(window.sessionStorage.getItem('price') * window.sessionStorage.getItem('num'));
		$('.goods-img').attr('src', window.sessionStorage.getItem('src'));
	}
	$('.expecial-p').click(function() {
		window.location.href = '../chajian/layuisjld/addres.html'
	})
	$('.go-shop').click(function() {
		window.location.href = 'shops.html';
	})
})
