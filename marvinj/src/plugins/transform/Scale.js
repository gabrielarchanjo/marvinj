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
			var width = imageIn.getWidth();
			var height = imageIn.getHeight();
			var newWidth = this.getAttribute("newWidth");
			var newHeight = this.getAttribute("newHeight");
			
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
		            imageOut.setIntColor(j,i, imageIn.getAlphaComponent(x2,y2), imageIn.getIntColor(x2,y2));
		        }                
		    }	    
		}
	};
	
	