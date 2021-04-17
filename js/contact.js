$(function() {

	$('.nav>a>li').mouseenter(function() {
		$(this).css({
			color: 'orange'
		});
	})
	$('.nav>a>li').mouseleave(function() {
		if ($(this).parent().index() != 6) {
			$(this).css({
				color: 'white'
			});
		}

	})
	//滚动事件
	$(window).scroll(function() {
		if ($(this).scrollTop() > $('.container').offset().top - 100) {
			$('.fixed-nav').css('display', 'block');
		} else {
			$('.fixed-nav').css('display', 'none');
		}

	})
	var flag2 = true;
	$('.fixed-nav>ul>li').mouseenter(function() {
		if (flag2) {
			flag2 = false;
			$(this).animate({
				right: '150px'
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

/*+-------------全局变量-------------------+*/
var $imgDir = '../images/'; //默认图片目录
var $yjzc_zb = "103.879532,30.220912"; //默认坐标
var $copyright = "baidu地图"; //版权信息
var $infoWindowOpenMethod = 'mouseover'; //标注点信息窗出现方式，mouseover 鼠标经过标注点时，click 点击标注点时 add 20191115-1

/*+------------地图初始化--------------------+*/
var map = new BMap.Map("allmap"); //allmap为加载地图区域的ID
BDMapInit(map, {
	"isNumc": 1,
	"city": "四川",
	"point": $yjzc_zb,
	"zoom": "17",
	"copyright": $copyright
});


/*+--------------------------------+*/
/**
 * 函数：加载坐标json数据
 * @param json <=> json数据
 */
function loadPointData(dataJson, paramJson) {

	map.clearOverlays(); //一次移除所有的覆盖物(相当于清空所有标注点)(必须!)

	for (var i = 0; i < dataJson.data.length; i++) {
		var $json = dataJson.data[i];
		var title = $json.title, //文本
			description = $json.detail; //描述
		zuobiao = $json.yjzc_zb.split(','),
			l_point = zuobiao[0], //经度
			r_point = zuobiao[1]; //纬度

		var img = '', //标注点图标
			style = ''; //标注点样式,使用英文颜色（eg.red）或颜色值（eg.'#1296db')
		if ($json.color == '1') {
			img = '定位.svg';
			style = "red";
		}

		if (img != '') img = $imgDir + img;

		//创建标注点
		var $pointJson = {
			"l_point": l_point,
			"r_point": r_point,
			"title": title,
			"description": description,
			"style": style,
			"icon": img
		}
		createMapPoint($pointJson, paramJson);

	}

}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*                                     分隔线                                                              *//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function() {
	var $coordinateJson = {
		data: [{
			yjzc_zb: '103.879532,30.220912',
			title: '四川大学锦江学院',
			detail: '四川省眉山市彭山区锦江大道一号',
			color: '3'
		}, ]
	}
	loadPointData($coordinateJson, {
		"showDetails": false
	}); //根据json加载地图数据

}); //END $(function(){});
