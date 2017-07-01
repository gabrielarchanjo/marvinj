	function Invert(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	Invert.prototype.load = function(){}
	
	Invert.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_arrMask = mask.getMask();
		
		var r, g, b;
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				r = (255-imageIn.getIntComponent0(x, y));
				g = (255-imageIn.getIntComponent1(x, y));
				b = (255-imageIn.getIntComponent2(x, y));

				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), r,g,b);
			}
		}
	}