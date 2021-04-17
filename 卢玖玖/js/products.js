$(function() {
	$('.container>.container1>.product>.p-top').animate({height:'512px'},500,function(){
		$('.container>.container1>.product>.p-bottom').animate({height:'52px'},500,function(){
			$('.container>.container1>.product>.p-top>.p-right>p:nth-child(1)').animate({left:'0'},500,function(){
				$('.container>.container1>.product>.p-top>.p-right>p:nth-child(2)').animate({left:'0'},400,function(){
					$('.container>.container1>.product>.p-top>.p-right>p:nth-child(3)').animate({left:'0'},300)
				})
			})
		})
	})
		var num = 0;
		var flag = true;
		$(window).mousewheel(function(e) {
			// deltaY监听鼠标的上滑或者下滑   上滑 1   下滑-1
			// console.log(e.deltaY)
			if (flag) {
				flag = false;
				num += e.deltaY;
				if (num > 0) {
					num = 0;
				}
				if (num < -3) {
					num = -3;
				}
				// console.log(num)
				$('.container').animate({
					top: 100 * num + 'vh'
				}, 1000, function() {
					
					if(num==-1){
						$('.container>.container2>.product>.p-top').animate({height:'512px'},500,function(){
							$('.container>.container2>.product>.p-bottom').animate({height:'52px'},500,function(){
								$('.container>.container2>.product>.p-top>.p-right>p:nth-child(1)').animate({left:'0'},500,function(){
									$('.container>.container2>.product>.p-top>.p-right>p:nth-child(2)').animate({left:'0'},400,function(){
										$('.container>.container2>.product>.p-top>.p-right>p:nth-child(3)').animate({left:'0'},300)
									})
								})
							})
						})
					}
					if(num==-2){
						$('.container>.container3>.product>.p-top').animate({height:'512px'},500,function(){
							$('.container>.container3>.product>.p-bottom').animate({height:'52px'},500,function(){
								$('.container>.container3>.product>.p-top>.p-right>p:nth-child(1)').animate({left:'0'},500,function(){
									$('.container>.container3>.product>.p-top>.p-right>p:nth-child(2)').animate({left:'0'},400,function(){
										$('.container>.container3>.product>.p-top>.p-right>p:nth-child(3)').animate({left:'0'},300)
									})
								})
							})
						})
					}
					if(num==-3){
						$('.container>.container4>.product>.p-top').animate({height:'512px'},500,function(){
							$('.container>.container4>.product>.p-bottom').animate({height:'52px'},500,function(){
								$('.container>.container4>.product>.p-top>.p-right>p:nth-child(1)').animate({left:'0'},500,function(){
									$('.container>.container4>.product>.p-top>.p-right>p:nth-child(2)').animate({left:'0'},400,function(){
										$('.container>.container4>.product>.p-top>.p-right>p:nth-child(3)').animate({left:'0'},300)
									})
								})
							})
						})
					}
					flag=true;
				});
				$('.loucheng>li').eq(Math.abs(num)).css('background', 'orange').siblings().css('background', '#aaa')
				$('.nav>a').eq(Math.abs(num) + 2).find('li').css('color', 'orange').end().siblings().find('li').css('color',
					'white');
			}
		})

		$('.loucheng>li').click(function() {
			num = -$(this).index();
			if (flag) {
				flag = false;
				$('.container').animate({
					top: 100 * num + 'vh'
				}, 1000, function() {
					flag = true;
				});
				$('.loucheng>li').eq(Math.abs(num)).css('background', 'orange').siblings().css('background', '#aaa')
				$('.nav>a').eq(Math.abs(num) + 2).find('li').css('color', 'orange').end().siblings().find('li').css('color',
					'white');
			}
		})

	})
