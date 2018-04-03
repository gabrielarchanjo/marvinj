	function CombineByAlpha(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	CombineByAlpha.prototype.load = function(){
		this.setAttribute("x", 0);
		this.setAttribute("y", 0);
		this.setAttribute("imageOther", null);
	}
	
	CombineByAlpha.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var imageOther = this.getAttribute("imageOther");
		var x = this.getAttribute("x");
		var y = this.getAttribute("y");
		
		if(imageOther != null){
			
			for(var j=0; j<imageIn.getHeight(); j++){
				for(var i=0; i<imageIn.getWidth(); i++){
					
					var ox = i-x;
					var oy = j-y;
					
					if(ox >= 0 && ox < imageOther.getWidth() && oy >= 0 && oy < imageOther.getHeight()){
						var alpha = imageOther.getAlphaComponent(ox,oy);
						if(alpha != 0){
							var factor = alpha/255;
							
							var rA = imageIn.getIntComponent0(i,j);
							var gA = imageIn.getIntComponent1(i,j);
							var bA = imageIn.getIntComponent2(i,j);
							
							var rB = imageOther.getIntComponent0(ox,oy);
							var gB = imageOther.getIntComponent1(ox,oy);
							var bB = imageOther.getIntComponent2(ox,oy);
							
							var red = Math.floor( (rA * (1-factor)) + (rB * (factor)) );
							var green = Math.floor( (gA * (1-factor)) + (gB * (factor)) );
							var blue = Math.floor( (bA * (1-factor)) + (bB * (factor)) );
							
							imageOut.setIntColor(i,j,Math.max(imageIn.getAlphaComponent(x,y), alpha), red, green, blue);
						} else{
							imageOut.setIntColor(i,j, imageIn.getIntColor(i,j));
						}
					} else{
						imageOut.setIntColor(i,j, imageIn.getIntColor(i,j));
					}
				}
			}
		}
	};