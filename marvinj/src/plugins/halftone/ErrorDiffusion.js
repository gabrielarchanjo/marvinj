	function ErrorDiffusion(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	ErrorDiffusion.prototype.load = function(){
		this.threshold = 128;
	}
	
	ErrorDiffusion.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var color;
		var dif;

		Marvin.grayScale(imageIn, imageOut, attributesOut, mask, previewMode);
		
		// Mask
		var l_arrMask;
		if(mask != null){
			l_arrMask = mask.getMask();
		}
		
		for (var y = 0; y < imageOut.getHeight(); y++) {
			for (var x = 0; x < imageOut.getWidth(); x++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				
				var color = imageOut.getIntComponent0(x, y);
				if(color > this.threshold){
					imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x,y), 255,255,255);
					dif = -(255-color);
				}
				else{
					imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x,y), 0,0,0);
					dif = color;
				}

				// Pixel Right
				if(x+1 < imageOut.getWidth()){
					color = imageOut.getIntComponent0(x+1,y);
					color+= Math.floor(0.4375*dif);
					color = this.getValidGray(color); 
					imageOut.setIntColor(x+1,y,imageIn.getAlphaComponent(x+1,y), color,color,color);

					// Pixel Right Down
					if(y+1 < imageOut.getHeight()){
						color = imageOut.getIntComponent0(x+1,y+1);
						color+=Math.floor(0.0625*dif);
						color = this.getValidGray(color); 
						imageOut.setIntColor(x+1,y+1,imageIn.getAlphaComponent(x+1,y+1), color,color,color);
					}
				}

				// Pixel Down
				if(y+1 < imageOut.getHeight()){
					color = imageOut.getIntComponent0(x,y+1);
					color+=Math.floor(0.3125*dif);
					color = this.getValidGray(color); 
					imageOut.setIntColor(x,y+1,imageIn.getAlphaComponent(x,y+1), color,color,color);

					// Pixel Down Left
					if(x-1 >= 0){
						color = imageOut.getIntComponent0(x-1,y+1);
						color+=Math.floor(0.1875*dif);
						color = this.getValidGray(color); 
						imageOut.setIntColor(x-1,y+1,imageIn.getAlphaComponent(x-1,y+1), color,color,color);
					}
				}
			}
		}
	}

	ErrorDiffusion.prototype.getValidGray = function(a_value){
		if(a_value < 0) return 0;
		if(a_value > 255) return 255;
		return a_value;
	}
