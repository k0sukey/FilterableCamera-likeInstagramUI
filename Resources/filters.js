/*
 * gamma : adjust : 
 * channels : color
 * vibrance : 自然な彩度 : adjust
 * exposure : （日光や風雨に）さらされる : adjust
 * vignette : size, strength
 * blur : ぼやけ : args
 * fillColor : color
 * noise : ノイズ : adjust
 * clip : adjust
 * grayscale : 白黒 : none
 * invert : 反転 : none
 * contrast : 対比 : adjust
 * sepia : セピア : adjust
 * saturation : 彩度 : adjust
 * enqueue : o
 * brightness : 光度 : adjust
 * curves : args
 * hue : 色相 : adjust
 * colorize : color, level
 */

exports.presets = {
	/*
	 * Normal
	 */
	Normal:new filterablecamera.Filter(function(){
		// NO OPERATION
	}),
	
	/*
	 * Gray
	 */
	Gray:new filterablecamera.Filter(function(){ 
		this.grayscale(); 
	}),
	
	/*
	 * Vintage 
	 */
	Vintage:new filterablecamera.Filter(function(){ 
		this.sepia(0.8)
			.vignette(0.8, 0.5); 
	}),
	
	/*
	 * OrangePeel
	 */
	OrangePeel:new filterablecamera.Filter(function(){ 
		this.curves({
			chan:'rgb', 
			start:[0.0, 0.0], 
			ctrl1:[0.4, 0.19], 
			ctrl2:[0.55, 0.78], 
			end:[1.0, 1.0]})
			.vibrance(-0.3)
		    .saturation(-0.3)
		    .colorize('#ff9000', 0.3)
		    .contrast(-0.05)
		    .gamma(1.4);
	}),
	
	/*
	 * Lomo
	 */
	Lomo:new filterablecamera.Filter(function(){
		this.brightness(0.15)
		    .exposure(0.15)
		    .curves({ 
		    	chan:'rgb', 
		    	start:[0.0, 0.0], 
		    	ctrl1:[0.78, 0.0], 
		    	ctrl2:[0.6, 1.0], 
		    	end:[1.0, 1.0]})
		    .saturation(-0.2)
		    .gamma(1.8)
		    .vignette(0.5, 0.6)
		    .brightness(0.05);
	}),
	
	/*
	 * Love
	 */
	Love:new filterablecamera.Filter(function(){
		this.brightness(0.05)
		    .exposure(0.08)
		    .colorize('#c42007', 0.3)
		    .vibrance(0.5)
		    .gamma(1.3);
	})
};