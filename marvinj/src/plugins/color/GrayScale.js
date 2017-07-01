
	function GrayScale(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	GrayScale.prototype.load = function(){};
	
	GrayScale.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		// Mask
		var l_arrMask;
		if(mask != null){
			l_arrMask = mask.getMask();
		}
		
		var r,g,b,finalColor;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				//Red - 30% / Green - 59% / Blue - 11%
				r = imageIn.getIntComponent0(x, y);
				g = imageIn.getIntComponent1(x, y);
				b = imageIn.getIntComponent2(x, y);
				finalColor = Math.ceil((r*0.3)+(g*0.59)+(b*0.11));
				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), finalColor,finalColor,finalColor);
								
			}
		}
	};

