	function Convolution(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	Convolution.prototype.load = function(){
		this.setAttribute("matrix", null);
	}
	
	Convolution.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var matrix = this.getAttribute("matrix");
		
		if(matrix != null && matrix.length > 0){
			
			for(var y=0; y<imageIn.getHeight(); y++){
				for(var x=0; x<imageIn.getWidth(); x++){
					
					if(y >= matrix.length/2 && y < imageIn.getHeight()-matrix.length/2 && x >= matrix[0].length/2 && x < imageIn.getWidth()-matrix[0].length/2){
						this.applyMatrix(x, y, matrix, imageIn, imageOut);
					}
					else{
						imageOut.setIntColor(x, y, 0xFF000000);
					}
				}
			}
		}
	};
	
	Convolution.prototype.applyMatrix = function
	(
		x,
		y,
		matrix,
		imageIn,
		imageOut
	){
		
		var nx,ny;
		var resultRed=0;
		var resultGreen=0;
		var resultBlue=0;
		
		var xC=Math.ceil(matrix[0].length/2);
		var yC=Math.ceil(matrix.length/2);
		
		for(var i=0; i<matrix.length; i++){
			for(var j=0; j<matrix[0].length; j++){
					
				if(matrix[i][j] != 0){		
					nx = x + (j-xC);
					ny = y + (i-yC);
					
					if(nx >= 0 && nx < imageOut.getWidth() && ny >= 0 && ny < imageOut.getHeight()){
						
						resultRed	+=	(matrix[i][j]*(imageIn.getIntComponent0(nx, ny)));
						resultGreen += 	(matrix[i][j]*(imageIn.getIntComponent1(nx, ny)));
						resultBlue	+=	(matrix[i][j]*(imageIn.getIntComponent2(nx, ny)));
					}
					
					
				}
				
				
				
			}
		}
		
		resultRed 	= Math.abs(resultRed);
		resultGreen = Math.abs(resultGreen);
		resultBlue = Math.abs(resultBlue);
		
		// allow the combination of multiple applications
		resultRed 	+= imageOut.getIntComponent0(x,y);
		resultGreen += imageOut.getIntComponent1(x,y);
		resultBlue 	+= imageOut.getIntComponent2(x,y);
		
		resultRed 	= Math.min(resultRed, 255);
		resultGreen = Math.min(resultGreen, 255);
		resultBlue 	= Math.min(resultBlue, 255);
		
		resultRed 	= Math.max(resultRed, 0);
		resultGreen = Math.max(resultGreen, 0);
		resultBlue 	= Math.max(resultBlue, 0);
		
		imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x, y), Math.floor(resultRed), Math.floor(resultGreen), Math.floor(resultBlue));
	};
