	/*
	* 百度地图API模块化成函数供前台调用
	* 百度API参考：http://lbsyun.baidu.com/index.php?title=jspopular
	* Demo示例演示：http://lbsyun.baidu.com/jsdemo.htm#c1_14
	* 百度地图坐标拾取/经纬度获取：http://api.map.baidu.com/lbsapi/getpoint/index.html
	* Author : ChenHairui
	* Date   : 2018.8.25
	*/


	/*+--------------------------百度地图API示例--------------------------------+*/
	



	/**
	* 百度地图初始化
	* @param map 百度地图api实例化对象(必须!HTML页面请使用var map = new BMap.Map("allmap");实例化把参数传递给本函数即可)
	* @param json 百度地图始始化要设置的参数组合成的json数据
	* json = {isNumc:1,city:"泉州",point:"118.611836,24.918225",zoom:"15",copyright:"XX版权所有"}
	* 	isNumc 地图中心点是根据城市还是坐标来设置(值：1、0), 
		city 默认中心点城市, (isNumc=1时有效),
		point 默认中心点经纬度坐标(isNumc=0时有效),
		zoom 地图缩放级别(值:3-19), 
		copyright 自定义地图版权信息.
	*/
	function BDMapInit(map,json){
		//=====初始化

		var isNumc = 1, //中心点依据
			defaultCity = '泉州', //中心点城市
			defaultPoint = '118.611836,24.918225', //中心点坐标
			defaultZoom = 15, //缩放级别 3-19
			copyright = 'ChenHairui版权所有，联系QQ：1614644937'; //版权信息
		if(typeof(json)!='undefined'){
			isNumc = typeof(json.isNumc)=='undefined' ? isNumc : json.isNumc,
			defaultCity = typeof(json.city)=='undefined' ? defaultCity : (json.city=='' ? defaultCity : json.city), 
			defaultPoint = typeof(json.point)=='undefined' ? defaultPoint : (json.point=='' ? defaultPoint : json.point), 
			defaultZoom = typeof(json.zoom)=='undefined' ? defaultZoom : json.zoom,
			copyright = typeof(json.copyright)=='undefined' ? copyright : json.copyright; 
		}
		var default_longitude = defaultPoint.split(',')[0], //经度
			default_latitude = defaultPoint.split(',')[1]; //纬度	

		map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
		//map.disableDragging();     //禁止拖拽
		//map.enableDragging(); //允许拖拽(默认允许)

		//=====设置百度地图中心点/默认城市(城市名称或坐标经纬度)
		var point = new BMap.Point(default_longitude,default_latitude);
		if(isNumc==1)
			map.centerAndZoom(point, defaultZoom); //用坐标设置地图中心站,map.centerAndZoom(city,zoom)  zoom值3-19,指地图缩放级别
		else 
			map.centerAndZoom(defaultCity,defaultZoom);  //用城市名设置地图中心点,  map.centerAndZoom(city,zoom)  zoom值3-19,指地图缩放级别

		//=====地图、卫星、三维、混合、小缩略图
		var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
		var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT});
		var overView = new BMap.OverviewMapControl();
		var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
		map.addControl(mapType1);          //左上角2D图，卫星图
		map.addControl(mapType2);          //左上角，默认地图控件
		map.setCurrentCity(defaultCity);   //由于有3D图，需要设置城市哦
		map.addControl(overView);          //添加默认缩略地图控件
		map.addControl(overViewOpen);      //右下角地图缩略图，打开

		//=====添加第3方版权信息
		var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_RIGHT});   //设置版权控件位置
		map.addControl(cr); //添加版权控件
		var bs = map.getBounds();   //返回地图可视区域
		cr.addCopyright({id: 1, content: '<a class="b_copyright">'+copyright+'</a>', bounds: bs}); 

		//=====城市切换
		map.enableContinuousZoom();
		var size = new BMap.Size(180, 10); //菜单水平和垂直位置
		map.addControl(new BMap.CityListControl({
		    anchor: BMAP_ANCHOR_TOP_LEFT,
		    offset: size,
		    // 切换城市之间事件
		    // onChangeBefore: function(){
		    //    alert('before');
		    // },
		    // 切换城市之后事件
		    // onChangeAfter:function(){
		    //   alert('after');
		    // }
		}));
	}


	/*
	function addMarker(point,label){
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setLabel(label);
	}
	*/


	/**
	* 创建坐标系统
	* @param json <=> json = {"l_point":l_point,"r_point":r_point,"title":title,"description":description}
	* 其中 l_point 坐标经度, r_point 坐标纬度, title 坐标文字标签(标题), description 坐标信息窗口(描述).
	* dragging 标注点是否可拖曳(可缺省) 值:true或false(默认false)
	* isInfo 是否有信息窗(可缺省) 值 true或false(默认true)
	* showDetails 是否默认就显示标注点详细信息 值 true或false（默认true)
	*/
	function createMapPoint(dataJson,paramJson){

		var l_point = dataJson.l_point,
			r_point = dataJson.r_point,
			title = dataJson.title,
			description = dataJson.description,
			dragging = typeof(dataJson.dragging)=='undefined' ? false : dataJson.dragging, //是否可拖动(默认false)
			isInfo = typeof(dataJson.isInfo)=='undefined' ? true : dataJson.isInfo, //是否有信息窗(默认true)
			style = typeof(dataJson.style)=='undefined' ? "" : dataJson.style, //样式
			iconImg = typeof(dataJson.icon)=='undefined' ? "" : dataJson.icon; //标注点自定义的图标

		var showDetails = typeof(paramJson) == 'undefined' ? false : typeof(paramJson.showDetails)=='undefined' ? false : paramJson.showDetails; //是否显示详细信息
		if(showDetails) isInfo = false;

	     //alert(iconImg);
	
		//..创建标注点
		var point = new BMap.Point(l_point,r_point); //创建坐标
		//自定义坐标图标
		var $iconJson = {}
		if(iconImg!=""){
			var size = new BMap.Size(30,30); //自定义的图标大小
			var iconOptions = {
				 //offset: new BMap.Size(0, 0),
			    //imageOffset: new BMap.Size(0, 0),
			    anchor: new BMap.Size(5, 10) //图标的定位锚点。此点用来决定图标与地理位置的关系，是相对于图标左上角的偏移值，默认等于图标宽度和高度的中间值
			}
			var icon = new BMap.Icon(iconImg, size,iconOptions);
			$iconJson = {"icon":icon}
		}

		
		var marker = new BMap.Marker(point,$iconJson); //创建标注
		map.addOverlay(marker); //将标注添加到地图中

		//..标注点是否可拖拽
		if(dragging) marker.enableDragging(); //可以拖拽
		else marker.disableDragging(); //不允许拖拽

		//..其它
		//marker.setAnimation(BMAP_ANIMATION_BOUNCE); //标注点使用跳动的动画
		//marker.disableMassClear(); //禁止覆盖物在 map.clearOverlays 方法中被清除 //enableMassClear(); //允许清除


		//..设置标注点文字标签
		if(showDetails) title = description;
		var $labelJson = {"point":point,"title":title,"style":style,"showDetails":showDetails}
		createMapLabel(marker,$labelJson);

		//..信息窗自定义按钮系列事件（点击信息窗口里的按钮） add 20191115-1
		if(typeof infoButtonClickFunc === 'function' ) infoButtonClickFunc(); //add 20191115-1

		//..设置标注点信息窗
		if(isInfo){
			var	$infoJson = {"point":point,"title":title,"description":description}
			createMapInfoWindow(marker,$infoJson);
		}

	}


	/**
	* 设置标注点文字标签
	* 即标注点旁边文本
	* @param title 文字标签的文字
	* @param point 文字标签对应的坐标对象
	*/
	function createMapLabel(marker,json){
		var point = json.point,
			title = json.title,
			style = json.style;
		var showDetails = json.showDetails;


		var l_opts = { //文字标签定位
		  position : point,    // 指定文本标注所在的地理位置
		  offset   : new BMap.Size(25, -25)    //设置文本偏移量x,y轴
		}

		//alert(showDetails);
		var color = '#fff',
			backgroundColor = style==''? 'red' : style,
			borderColor = style=='' ? 'red' : 'transparent';

		var styleJson = { //文字标签样式
			 color : "inherit",
			 backgroundColor:"red",
			 fontSize : "12px",
			 //height : "20px",
			 //lineHeight : "20px",
			 padding:"5px 8px",
			 borderWidth:"1px",
			 borderStyle:"solid",
			 borderColor:"red",
			 borderRadius:"3px",
			 fontFamily:"微软雅黑"
		}
		var label = new BMap.Label('<div class="bdLabel '+style+'">'+title+'</div>', l_opts);  // 创建文本标注对象
		label.setStyle(styleJson);
		//map.addOverlay(label); 
		marker.setLabel(label);

		var $parent = $('.bdLabel').parents('.BMapLabel');
		if(showDetails) $parent.addClass('hasDetail');
		else $parent.removeClass('hasDetail');
		
	}

	/**
	* 设置标注点信息窗
	* 即坐标详细信息
	* @param marker 标注对象
	* @param json 信息窗内数据组成的json
	*/
	function createMapInfoWindow(marker,json){
		var title = json.title,
			description = json.description,
			point = json.point;
		var content = '<div class="bdInfoWindow">'+description+'</div>';

		var infoOptions = {
		  "width" : 0,     //信息窗宽度(220-730) 0 自动调整
		  "maxWidth":500,  //信息窗最大宽度(220-730)
		  "height": 0,     //信息窗高度(60-650) 0 自动调整
		  "offset":{width:15, height: -10}, //信息窗位置偏移
		 //"enableAutoPan":true, //是否开启信息窗口打开时地图自动移动（默认开启）
		  //"title" : title //信息窗标题文字，支持HTML内容
		  "title" : ""
		}



		var infoWindow = new BMap.InfoWindow(content, infoOptions);  // 创建信息窗口对象

		//打开信息窗
		if($infoWindowOpenMethod=='click'){
			//鼠标点击标注点时弹出信息窗 add 20191115-1
			marker.addEventListener("click", 
	            function(){
	                this.openInfoWindow(infoWindow);
	            }
	        );
		}else{
	        //鼠标移动到标注点时弹出信息窗
			marker.addEventListener("mouseover", function(e){  //mouseover鼠标经过时,click鼠标点击时
				//var p = e.target.getPosition();
				//alert("标注点的位置是" + p.lng + "," + p.lat); 
				//var point = new BMap.Point(p.lng, p.lat);  //标注点坐标
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			});
		}


		//信息窗自定义按钮系列事件（点击信息窗口里的按钮） add 20191115-1
		if(!infoWindow.isOpen()){ //isOpen()返回信息窗口的打开状态，第1次点击时是false,其它时间都是true
			infoWindow.addEventListener('open', function(e){
				if(typeof infoButtonClickFunc === 'function') infoButtonClickFunc(); 
			});				
		}else{
			if(typeof infoButtonClickFunc === 'function') infoButtonClickFunc(); 
			
		}
		

	}



	//var marker = new BMap.Marker(new BMap.Point(118.613382,24.915539));
	//map.addOverlay(marker);




	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//*                                     分隔线                                                              *//
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*+---------------------------------------+*/
	/**
	* 获取HTML DOM元素类型
	* @param ID 元素ID
	* 返回值当前元素的标签名
	*/
	function getTagNameOfElement(ID){
		var tagName = document.getElementById(ID).tagName.toLocaleLowerCase(); //
		return tagName; //如input|span|div|select等
	}

	/*+---------------------------------------+*/
	/**
	* 给HTML DOM元素赋值
	* @param id 元素ID
	* @param value 要赋的值
	* @param json  其它参数以json格式组成, {"isHTML":true}
	* isHTML 指定是否使用innerHTML赋值方式，还是innerText赋值方式
	*/
	function assignValue2Element(id,value,json){
		var isHTML = typeof(json)=='undefined' ? false : ( typeof(json.isHTML)=='undefined' ? false : json.isHTML );

		if(getTagNameOfElement(id)=='input') document.getElementById(id).value = value;
		else{
			if(isHTML) document.getElementById(id).innerText = value;
			else document.getElementById(id).innerHTML = value;
		}

	}

