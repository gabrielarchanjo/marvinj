	function ThresholdingNeighborhood(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	ThresholdingNeighborhood.prototype.load = function() {
		this.setAttribute("neighborhoodSide", 10);
		this.setAttribute("samplingPixelDistance", 1);
		this.setAttribute("thresholdPercentageOfAverage", 1.0);
	}

	ThresholdingNeighborhood.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var neighborhoodSide = this.getAttribute("neighborhoodSide");
		var samplingPixelDistance = this.getAttribute("samplingPixelDistance");
		var thresholdPercentageOfAverage = this.getAttribute("thresholdPercentageOfAverage");
		
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				this.theshold(imageIn, imageOut, x, y, thresholdPercentageOfAverage, neighborhoodSide, samplingPixelDistance);
			}
		}
	}
	
	ThresholdingNeighborhood.prototype.theshold = function(image, imageOut, x, y, thresholdPercentageOfAverage, side, neighborhoodDistance){
		
		var min=-1;
		var max=-1;
		var pixels=0;
		var average=0;
		
		var inc = neighborhoodDistance;
		
		
		for(var j=y-(side/2); j<y+(inc+side/2); j+=inc){
			for(var i=x-(side/2); i<x+(side/2); i+=inc){
				
				if(i >= 0 && j>= 0 && i < image.getWidth() && j < image.getHeight()){
					
					var color = image.getIntComponent0(i,j);
					
					if(min == -1 || color < min){
						min = color;
					}
					if(max == -1 || color > max){
						max = color;
					}
						
					average+=color;
					pixels++;
				}
			}
		}
		
		average /= pixels;
			
		var color = image.getIntComponent0(x,y);
		
		if(color < average*thresholdPercentageOfAverage || (max-min) <= 30){
			imageOut.setIntColor(x, y, 255, 0, 0, 0);
		} else{
			imageOut.setIntColor(x, y, 255, 255, 255, 255);
		}
	};
