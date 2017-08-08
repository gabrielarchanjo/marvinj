	function Thresholding(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
		
		this.threshold = null;
		this.thresholdRange = null;
		this.neighborhood = null;
		this.range = null;
	}

	Thresholding.prototype.load = function(){
		
		// Attributes
		this.setAttribute("threshold", 125);
		this.setAttribute("thresholdRange", -1);
		this.setAttribute("neighborhood", -1);
		this.setAttribute("range", -1);
		
		this.pluginGray = new GrayScale();
	}
	
	Thresholding.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.threshold = this.getAttribute("threshold");
		this.thresholdRange = this.getAttribute("thresholdRange");
		this.neighborhood = this.getAttribute("neighborhood");
		this.range = this.getAttribute("range");
		
		if(this.thresholdRange == -1){
			this.thresholdRange = 255-threshold;
		}
		
		this.pluginGray.process(imageIn, imageOut, attributesOut, mask, previewMode);
		
		var bmask = mask.getMask();
		
		if(this.neighborhood == -1 && this.range == -1){
			this.hardThreshold(imageIn, imageOut, bmask);
		}
		else{
			this.contrastThreshold(imageIn, imageOut);
		}
				
	}
	
	Thresholding.prototype.hardThreshold = function(imageIn, imageOut, mask){
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				if(mask != null && !mask[x][y]){
					continue;
				}
				
				var gray = imageIn.getIntComponent0(x,y); 
				if(gray < this.threshold || gray > this.threshold+this.thresholdRange){
					imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x,y), 0,0,0);
				}
				else{
					imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x,y), 255,255,255);
				}				
			}
		}	
	}
	
	Thresholding.prototype.contrastThreshold = function(imageIn, imageOut){
		this.range = 1;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(checkNeighbors(x,y, neighborhood, neighborhood, imageIn)){
					imageOut.setIntColor(x,y,0,0,0);
				}
				else{
					imageOut.setIntColor(x,y,255,255,255);
				}
			}
		}
	}
	
	Thresholding.prototype.checkNeighbors = function(x, y, neighborhoodX, neighborhoodY, img){
		
		var color;
		var z=0;
		
		color = img.getIntComponent0(x, y);
		
		for(var i=0-neighborhoodX; i<=neighborhoodX; i++){
			for(var j=0-neighborhoodY; j<=neighborhoodY; j++){
				if(i == 0 && j == 0){
					continue;
				}
				
				if(color < getSafeColor(x+i,y+j, img)-range && getSafeColor(x+i,y+j, img) != -1){
					z++;
				}
			}
		}
		
		if(z > (neighborhoodX*neighborhoodY)*0.5){
			return true;
		}
		
		return false;
	};
	
	Thresholding.prototype.getSafeColor = function(x, y, img){
		
		if(x >= 0 && x < img.getWidth() && y >= 0 && y < img.getHeight()){
			return img.getIntComponent0(x, y);
		}
		return -1;
	};
