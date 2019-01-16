	function AlphaBoundary(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	AlphaBoundary.prototype.load = function(){
		this.setAttribute("radius", 5);
	};
	
	AlphaBoundary.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var neighborhood = this.getAttribute("radius");
		for(var y=0; y<imageOut.getHeight(); y++){
			for(var x=0; x<imageOut.getWidth(); x++){
				this.alphaRadius(imageOut, x, y, neighborhood);
			}
		}
	};
	
	AlphaBoundary.prototype.alphaRadius = function(image, x, y, radius){
		
		var oldAlpha = image.getAlphaComponent(x, y);
		var newAlpha;
		var totalAlpha=0;
		var totalPixels=0;
		var hn = Math.floor(radius/2);
		
		for(var j=y-hn; j<y+hn; j++){
			for(var i=x-hn; i<x+hn; i++){
				
				if(i >= 0 && i< image.getWidth() && j >= 0 && j < image.getHeight()){
					totalAlpha += image.getAlphaComponent(i, j);
					totalPixels++;
				}
			}
		}
		
		newAlpha = Math.floor(totalAlpha/totalPixels);
		
		if(newAlpha < oldAlpha)
		image.setAlphaComponent(x, y, newAlpha);
	};

