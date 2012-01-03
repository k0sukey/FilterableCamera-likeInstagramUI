// 
// Filterable Camera module example of default user interface
// 
var filterablecamera = require('jp.msmc.filterablecamera');
var presets = require('filters').presets;
var setting = require('setting');
var qualities = ['Photo', 'High', 'Low'];

// default filter 
var activeFilterName = 'Normal';
filterablecamera.activeFilter = presets[activeFilterName];

var window = currentWindow = Ti.UI.createWindow({
    orientationModes: [
        Ti.UI.LANDSCAPE_LEFT,
        Ti.UI.LANDSCAPE_RIGHT,
        Ti.UI.PORTRAIT,
        Ti.UI.UPSIDE_PORTRAIT
    ],
    fullscreen:true
});

var squared_ = Ti.UI.createLabel({
    top:30,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Squared:',
});

var squared = Ti.UI.createSwitch({
    top:30,
    left:180,
    value:true,
});

var showControls_ = Ti.UI.createLabel({
    top:80,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Show Controls:',    
});

var showControls = Ti.UI.createSwitch({
    top:80,
    left:180,
    value:true,
});

var animated_ = Ti.UI.createLabel({
    top:130,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Animated:',    
});

var animated = Ti.UI.createSwitch({
    top:130,
    left:180,
    value:true,
});

var autohide_ = Ti.UI.createLabel({
    top:180,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Auto Hide:',    
});

var autohide = Ti.UI.createSwitch({
    top:180,
    left:180,
    value:true,
});

var saveToPhotoGallery_ = Ti.UI.createLabel({
    top:230,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Save Photo:',    
});

var saveToPhotoGallery = Ti.UI.createSwitch({
    top:230,
    left:180,
    value:true,
});

var backgroundImage_ = Ti.UI.createLabel({
    top:280,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Custom Background:',    
});

var backgroundImage = Ti.UI.createSwitch({
    top:280,
    left:180,
    value:false,
});

var quality_ = Ti.UI.createLabel({
    top:330,
    right:170,
    textAlign:'right',
    width:'auto',
    height:'auto',
    color:'white',
    text:'Quality:',    
});

var quality = Ti.UI.createButton({
    top:330,
    left:180,
    width:80,
    height:32,
    title:qualities[0],
});

var showCamera = Ti.UI.createButton({
    bottom:8,
    height:32,
    width:160,
    title:'Show Camera'
});

var settingView = setting.createSettingView();

Array.prototype.indexOf = function(value) {
    for(var i = 0; i < this.length ; i++){
        if(this[i] === value){
            return i;
        }
    }
    return -1;
}

quality.addEventListener('click', function(){
    var index = qualities.indexOf(quality.title);
    index = (index + 1) % qualities.length
    quality.title = qualities[index];
});

// Call showCamera to take picture.
// showCamera has options below.
showCamera.addEventListener('click', function(){
    filterablecamera.showCamera({
        squared:squared.value,
        showControls:showControls.value, // CAUTION! when showControls false, cannot close modal window!
        animated:animated.value,
        autohide:autohide.value,
        saveToPhotoGallery:saveToPhotoGallery.value,
        overlay:settingView,
        quality:quality.title,
        backgroundImage:backgroundImage.value ? 'images/wood010.jpg' : null,
        success:function(e){
            // e.image is picture you took(blob)
            Ti.API.debug("image was captured. e.image:"+e.image);
        },
        error:function(){
            Ti.API.debug("image was not captured.");
        },
        cancel:function(){
            Ti.API.debug("capturing was canceled.");
        }
    });
});


// Handle 'change' event to modify camera settings,
// 'target' event property indicates the type of setting to modify.
// (default interface invokes this event.)
//
// CAUTION!
// camera interface is modal window, 
// setting interface must be in overlay view.
filterablecamera.addEventListener('change', function(e){
	var target = setting.targets[e.target];
    // activate current setting
	for(var i in target){
		if(e.target === 'activeFilter'){
			target[i].active = (activeFilterName === target[i].value);
		}else{
			target[i].active = (filterablecamera[e.target] === target[i].value);
		}
	}
    // show setting
	switch (e.target) {
		case 'inputSource':
			settingView.showInputSource({
				data:target,
				selected:function(item){
					filterablecamera[e.target] = item.value;
				}
			});
			break;
		case 'tiltshift':
			settingView.showTiltShift({
				data:target,
				selected:function(item){
					filterablecamera[e.target] = item.value;
				}
			});
			break;
		case 'flashMode':
			settingView.showFlashMode({
				data:target,
				selected:function(item){
					filterablecamera[e.target] = item.value;
				}
			});
			break;
		case 'activeFilter':
			settingView.showActiveFilter({
				data:target,
				selected:function(item){
					filterablecamera[e.target] = presets[item.value];
					activeFilterName = item.value;
				}
			});
			break;
	}
});

window.add(squared_);
window.add(squared);
window.add(showControls_);
window.add(showControls);
window.add(animated_);
window.add(animated);
window.add(autohide_);
window.add(autohide);
window.add(saveToPhotoGallery_);
window.add(saveToPhotoGallery);
window.add(backgroundImage_);
window.add(backgroundImage);
window.add(quality_);
window.add(quality);
window.add(showCamera);
window.open();


