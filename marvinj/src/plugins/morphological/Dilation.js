	function Dilation(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Dilation.prototype.load = function(){
		
		this.matrix = MarvinJSUtils.createMatrix2D(3,3,true);
		this.setAttribute("matrix",3);
	}

	Dilation.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var matrix = this.getAttribute("matrix");
		
		if(imgIn.getColorModel() == MarvinImage.COLOR_MODEL_BINARY && matrix != null){
			
			MarvinImage.copyColorArray(imgIn, imgOut);
			
			for(var y=0; y<imgIn.getHeight(); y++){
				for(var x=0; x<imgIn.getWidth(); x++){
					this.applyMatrix(x, y, matrix, imgIn, imgOut);
				}
			}
		}
	}
	
	Dilation.prototype.applyMatrix = function
	(
		x,
		y,
		matrix,
		imgIn,
		imgOut
	){
		
		var nx,ny;
		var xC=matrix[0].length/2;
		var yC=matrix.length/2;
		
		if(imgIn.getBinaryColor(x, y)){
			for(var i=0; i<matrix.length; i++){
				for(var j=0; j<matrix.length; j++){
					
					if((i != yC || j != xC) && matrix[i][j]){
						
						nx = x + (j-xC);
						ny = y + (i-yC);
						
						if(nx > 0 && nx < imgOut.getWidth() && ny > 0 && ny < imgOut.getHeight()){
							imgOut.setBinaryColor(nx, ny, true);
						}
					}
				}
			}
		}
	}

