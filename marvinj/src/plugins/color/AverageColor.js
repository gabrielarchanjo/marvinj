	function AverageColor(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	AverageColor.prototype.load = function(){
	};
	
	AverageColor.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		
		var totalR=0;
		var totalG=0;
		var totalB=0;
		
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				totalR += imageIn.getIntComponent0(x,y);
				totalG += imageIn.getIntComponent1(x,y);
				totalB += imageIn.getIntComponent2(x,y);
			}
		}
		
		var totalPixels = imageIn.getWidth()*imageIn.getHeight();
		totalR = Math.round(totalR/totalPixels);
		totalG = Math.round(totalG/totalPixels);
		totalB = Math.round(totalB/totalPixels);
		
		if(attributesOut != null){
			attributesOut.set("averageColor", [totalR, totalG, totalB]);
		}
	};