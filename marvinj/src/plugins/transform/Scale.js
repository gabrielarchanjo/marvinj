	function Scale(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	};
	
	Scale.prototype.load = function(){
		// Attributes
		this.setAttribute("newWidth", 0);
		this.setAttribute("newHeight", 0);
	};
			
	Scale.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		
		if(!previewMode){
			width = imageIn.getWidth();
			height = imageIn.getHeight();
			newWidth = this.getAttribute("newWidth");
			newHeight = this.getAttribute("newHeight");
			
			if(imageOut.getWidth() != newWidth || imageOut.getHeight() != newHeight){
				imageOut.setDimension(newWidth, newHeight);
			}
			
		    var x_ratio = Math.floor((width<<16)/newWidth) ;
		    var y_ratio = Math.floor((height<<16)/newHeight) ;
		    var x2, y2 ;
		    for (var i=0;i<newHeight;i++) {
		        for (var j=0;j<newWidth;j++) {
		            x2 = Math.floor((j*x_ratio)>>16) ;
		            y2 = Math.floor((i*y_ratio)>>16) ;
		            imageOut.setIntColor(j,i, 255, imageIn.getIntColor(x2,y2));
		        }                
		    }	    
		}
	};
	
	