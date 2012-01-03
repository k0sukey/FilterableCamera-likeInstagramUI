exports.targets = {
	flashMode:[
		{ 
			text:'Off',
			image:'images/flash_off.png',
			value:filterablecamera.FLASH_MODE_OFF
		},
		{ 
			text:'On',
			image:'images/flash_on.png',
			value:filterablecamera.FLASH_MODE_ON
		},
		{ 
			text:'Auto',
			image:'images/flash_auto.png',
			value:filterablecamera.FLASH_MODE_AUTO
		}
	],
	inputSource:[
		{ 
			text:'Back',
			image:'images/camera_back.png',
			value:filterablecamera.INPUT_SOURCE_BACK
		},
		{ 
			text:'Front',
			image:'images/camera_front.png',
			value:filterablecamera.INPUT_SOURCE_FRONT
		}
	],
	tiltshift:[
		{ 
			text:'Off',
			image:'images/tiltshift_off.png',
			value:filterablecamera.TILTSHIFT_OFF
		},
		{ 
			text:'Circle',
			image:'images/tiltshift_circle.png',
			value:filterablecamera.TILTSHIFT_CIRCLE
		},
		{ 
			text:'Line',
			image:'images/tiltshift_line.png',
			value:filterablecamera.TILTSHIFT_LINE
		}	
	],
	activeFilter:[
		{
			text:'Normal',
			image:'images/filter_normal.png',
			value:'Normal'
		},
		{
			text:'Vintage',
			image:'images/filter_vintage.png',
			value:'Vintage'
		},
		{
			text:'Gray',
			image:'images/filter_gray.png',
			value:'Gray'
		},
		{
			text:'OrangePeel',
			image:'images/filter_orangepeel.png',
			value:'OrangePeel'
		},
		{
			text:'Lomo',
			image:'images/filter_lomo.png',
			value:'Lomo'
		},
		{
			text:'Love',
			image:'images/filter_love.png',
			value:'Love'
		}
	]
}

exports.createSettingView = function(args){
	var settingView = Ti.UI.createView({
		opacity:0.0
	});

	var selector;
	var selectedHandler;

	var animateShow = function() {
		settingView.animate({opacity:0.9, duration:200.0})	
	};
	
	var animateHide = function(selectedItem) {
		settingView.animate({opacity:0.0, duration:300.0}, function(){
			if(selectedItem && selectedHandler){
				selectedHandler(selectedItem);
			}			
		});
	};

	settingView.showInputSource = function(args){
		if (selector) {
			var children = selector.getChildren();
			for (var i = 0; i < children.length; i++) {
				selector.remove(children[i]);
			}
			settingView.remove(selector);
		}

		var selectorView = Ti.UI.createView({
			borderColor:'#cccccc',
			borderRadius:15.0,
			borderWidth:2.0,
			backgroundImage:'images/bg.png',
			top:50,
			left:92,
			width:48,
			height:40 * args.data.length + 8
		});
		settingView.add(selectorView);
		selector = selectorView;

		args.data.forEach(function(value, key, array){
			var image = Ti.UI.createImageView({
				top:((key == 0) ? 8 : 8 * (key + 1)) + key * 32,
				left:8,
				width:32,
				height:32,
				image:value.image,
				item:value,
				borderRadius:6
			});

			image.addEventListener('click', function(e){
				animateHide(this.item);
			});

			selectorView.add(image);
		});

		animateShow();
		if(args.selected){
			selectedHandler = args.selected;
		}
	};

	settingView.showTiltShift = function(args){
		if (selector) {
			var children = selector.getChildren();
			for (var i = 0; i < children.length; i++) {
				selector.remove(children[i]);
			}
			settingView.remove(selector);
		}

		var selectorView = Ti.UI.createView({
			borderColor:'#cccccc',
			borderRadius:15.0,
			borderWidth:2.0,
			backgroundImage:'images/bg.png',
			top:50,
			left:181,
			width:48,
			height:40 * args.data.length + 8
		});
		settingView.add(selectorView);
		selector = selectorView;

		args.data.forEach(function(value, key, array){
			var image = Ti.UI.createImageView({
				top:((key == 0) ? 8 : 8 * (key + 1)) + key * 32,
				left:8,
				width:32,
				height:32,
				image:value.image,
				item:value,
				borderRadius:6
			});

			image.addEventListener('click', function(e){
				animateHide(this.item);
			});

			selectorView.add(image);
		});

		animateShow();
		if(args.selected){
			selectedHandler = args.selected;
		}
	};

	settingView.showFlashMode = function(args){
		if (selector) {
			var children = selector.getChildren();
			for (var i = 0; i < children.length; i++) {
				selector.remove(children[i]);
			}
			settingView.remove(selector);
		}

		var selectorView = Ti.UI.createView({
			borderColor:'#cccccc',
			borderRadius:15.0,
			borderWidth:2.0,
			backgroundImage:'images/bg.png',
			top:50,
			left:267,
			width:48,
			height:40 * args.data.length + 8
		});
		settingView.add(selectorView);
		selector = selectorView;

		args.data.forEach(function(value, key, array){
			var image = Ti.UI.createImageView({
				top:((key == 0) ? 8 : 8 * (key + 1)) + key * 32,
				left:8,
				width:32,
				height:32,
				image:value.image,
				item:value,
				borderRadius:6
			});

			image.addEventListener('click', function(e){
				animateHide(this.item);
			});

			selectorView.add(image);
		});

		animateShow();
		if(args.selected){
			selectedHandler = args.selected;
		}
	};

	settingView.showActiveFilter = function(args){
		if (selector) {
			var children = selector.getChildren();
			for (var i = 0; i < children.length; i++) {
				selector.remove(children[i]);
			}
			settingView.remove(selector);
		}

		var selectorView = Ti.UI.createScrollView({
			bottom:44,
			height:64,
			contentWidth:'auto',
			contentHeight:64
		});
		settingView.add(selectorView);
		selector = selectorView;

		args.data.forEach(function(value, key, array){
			var image = Ti.UI.createImageView({
				top:4,
				left:((key == 0) ? 8 : 8 * (key + 1)) + key * 48,
				right:(key + 1 == array.length ? 8 : null),
				width:48,
				height:48,
				image:value.image,
				item:value,
				borderRadius:6,
				borderColor:'#000'
			});

			image.addEventListener('click', function(e){
				animateHide(this.item);
			});

			selectorView.add(image);

			var text = Ti.UI.createLabel({
				bottom:0,
				left:((key == 0) ? 8 : 8 * (key + 1)) + key * 48,
				right:(key + 1 == array.length ? 8 : null),
				width:48,
				color:value.active ? '#ffcc44' : '#fff',
				text:value.text,
				height:14,
				font:{fontSize:10},
				textAlign:'center'
			});
			selectorView.add(text);
		});

		animateShow();
		if(args.selected){
			selectedHandler = args.selected;
		}
	};

	return settingView;
};

