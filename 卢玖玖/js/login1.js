$(function() {
		var pattern = /^[\u4e00-\u9fa5a-zA-Z0-9_]{6,12}$/;
		$('.name').blur(function() {
			var name = $('.name').val();
			if (name == '') {
				$('.tips1').css('display', 'block');
			}
		})
		$('.pwd').blur(function() {
			var name = $('.pwd').val();
			if (name == '') {
				$('.tips').css('display', 'block');
			}
		})
		$('.name').focus(function() {
			$('.tips1').css('display', 'none');
		})
		$('.pwd').focus(function() {
			$('.tips').css('display', 'none');
		})
		$('.login').click(function() {
			if ($('.name').val() == '123123' && $('.pwd').val() == '123123') {
				window.location.href = '../index.html'
			}
		})
	})
