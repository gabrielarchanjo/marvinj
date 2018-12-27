	function DetermineFixedCameraBackground(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
		
	DetermineFixedCameraBackground.prototype.load = function(){
		this.initialized=false;
	}
	
	DetermineFixedCameraBackground.prototype.initialize = function(imageIn){
		this.weights = this.weights = MarvinJSUtils.createMatrix4D(imageIn.getWidth(), imageIn.getHeight(), 3, 26, 0);
		initialized=true;
	}
	
	DetermineFixedCameraBackground.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		if(!this.initialized){
			this.initialize(imageIn);
		}
		
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				var red 	= imageIn.getIntComponent0(x, y);
				var green 	= imageIn.getIntComponent1(x, y);
				var blue 	= imageIn.getIntComponent2(x, y);
				
				
				weights[x][y][0][red/10]++;
				weights[x][y][1][green/10]++;
				weights[x][y][2][blue/10]++;
				
				
				imageOut.setIntColor(x, y, 255, this.getProbableColor(weights[x][y][0]), this.getProbableColor(weights[x][y][1]), this.getProbableColor(weights[x][y][2]));
			}
		}	
	}
	
	DetermineFixedCameraBackground.prototype.getProbableColor = function(arr){
		var max = -1;
		var maxIndex = 0;
		
		for(var i=0; i<arr.length; i++){
		if(max == -1 || arr[i] > max){
				max = arr[i];
				maxIndex = i;
			}
		}
		
		return maxIndex*10;
	}

