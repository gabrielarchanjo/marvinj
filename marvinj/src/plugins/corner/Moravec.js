	function Moravec(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Moravec.prototype.load = function(){
		this.setAttribute("matrixSize", 3);
		this.setAttribute("threshold", 0);
	}

	Moravec.prototype.process = function
	(
		imageIn, 
		imageOut,
		attrOut,
		mask, 
		previewMode
	)
	{
		var matrixSize = this.getAttribute("matrixSize");
		var threshold = this.getAttribute("threshold");
		
		var tempImage = new MarvinImage(imageIn.getWidth(), imageIn.getHeight());
		Marvin.grayScale(imageIn, tempImage);
		
		var cornernessMap = MarvinJSUtils.createMatrix2D(tempImage.getWidth(), tempImage.getHeight(), 0);
		var cornernessMapOut = MarvinJSUtils.createMatrix2D(tempImage.getWidth(), tempImage.getHeight(), 0);
		
		for(var y=0; y<tempImage.getHeight(); y++){
			for(var x=0; x<tempImage.getWidth(); x++){
				cornernessMap[x][y] = this.c(x,y,matrixSize,tempImage);
				
				if(cornernessMap[x][y] < threshold){
					cornernessMap[x][y] = 0;
				}
			}
		}
		
		for(var x=0; x<cornernessMap.length; x++){
			for(var y=0; y<cornernessMap[x].length; y++){
				cornernessMapOut[x][y] = this.nonmax(x,y,matrixSize,cornernessMap);
				
				if(cornernessMapOut[x][y] > 0){
					cornernessMapOut[x][y] = 1;
				}
			}
		}
		
		if(attrOut != null){
			attrOut.set("cornernessMap", cornernessMapOut);
		}
	}
	
	Moravec.prototype.nonmax = function(x, y, matrixSize, matrix){
		var s = Math.floor(matrixSize/2);
		if(x-(s+1) >= 0 && x+(s+1) < matrix.length && y-(s+1) >= 0 && y+(s+1) < matrix[0].length){
			for(var i=-s; i<=s; i++){
				for(var j=-s; j<=s; j++){
					if(i != 0 || j != 0){
						if(matrix[x][y] < matrix[x+i][y+j]){
							return 0;
						}
					}
				}
			}
		}
		return matrix[x][y];
	}
	
	Moravec.directions = [[1,0], [-1, 0], [0, 1], [0,-1], [-1,-1], [1, -1], [-1, 1], [1,1]];
	
	Moravec.prototype.c = function(x, y, matrixSize, image){
		
		var ret = -1;
		var temp;
		var s = Math.floor(matrixSize/2);
		if(x-(s+1) >= 0 && x+(s+1) < image.getWidth() && y-(s+1) >= 0 && y+(s+1) < image.getHeight()){
			
			for(var d=0; d<Moravec.directions.length; d++){
				temp=0;
				for(var i=-s; i<=s; i++){
					for(var j=-s; j<=s; j++){
						temp += Math.pow(image.getIntComponent0(x+i, y+j)-image.getIntComponent0(x+i+Moravec.directions[d][0],y+j+Moravec.directions[d][1]), 2);
					}
				}
				if(ret == -1 || temp < ret){
					ret = temp;
				}
			}
			
		}
		return ret;
	}


