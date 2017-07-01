
	function Emboss(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Emboss.prototype.load = function(){}
	
	Emboss.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					imageOut.setIntColor(x, y, 255, imageIn.getIntColor(x, y));
					continue;
				}
				             
				var rDiff=0; 
				var gDiff=0;
				var bDiff=0;
				
	             if (y > 0 && x > 0){
     
		             // Red component difference between the current and the upperleft pixels
	            	 rDiff = imageIn.getIntComponent0(x, y) - imageIn.getIntComponent0(x-1, y-1);
		             
		             // Green component difference between the current and the upperleft pixels
	            	 gDiff = imageIn.getIntComponent1(x, y) - imageIn.getIntComponent1(x-1, y-1);
		             
		             // Blue component difference between the current and the upperleft pixels
	            	 bDiff = imageIn.getIntComponent2(x, y) - imageIn.getIntComponent2(x-1, y-1);
		             
	             }
	             else{
	            	 rDiff = 0;
	            	 gDiff = 0;
	            	 bDiff = 0;
	             }
		    
		         var diff = rDiff;
		         if (Math.abs (gDiff) > Math.abs (diff))
		              diff = gDiff;
		         if (Math.abs (bDiff) > Math.abs (diff))
		              diff = bDiff;
	
		         var grayLevel = Math.max (Math.min (128 + diff, 255),0);
	
		        imageOut.setIntColor(x, y, 255, grayLevel, grayLevel, grayLevel);
			}
		}
	}