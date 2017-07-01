	function GaussianBlur(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	GaussianBlur.prototype.load = function(){
		
		this.RED = 0;
		this.GREEN = 1;
		this.BLUE = 2;

		this.kernelMatrix = null;
		this.resultMatrix = null;
		this.appiledkernelMatrix = null;
		this.radius = null;
		
		this.setAttribute("radius",3);
	}
	
	GaussianBlur.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.radius = this.getAttribute("radius");

		var l_imageWidth = imageIn.getWidth();
		var l_imageHeight = imageIn.getHeight();

		var l_pixelColor;
		this.kernelMatrix = this.getGaussianKernel();
		this.resultMatrix = MarvinJSUtils.createMatrix3D(l_imageWidth, l_imageHeight, 3, 0);
		this.appiledkernelMatrix = MarvinJSUtils.createMatrix2D(l_imageWidth, l_imageHeight, 0);
		
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < l_imageWidth; x++) {
			for (var y = 0; y < l_imageHeight; y++) {	
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				l_pixelColor = imageIn.getIntColor(x,y);
				this.applyKernel(x,y,l_pixelColor,imageOut);
			}
		}
		
		for (var x = 0; x < l_imageWidth; x++) {
			for (var y = 0; y < l_imageHeight; y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				this.resultMatrix[x][y][this.RED] = ((this.resultMatrix[x][y][0]/this.appiledkernelMatrix[x][y])%256);
				this.resultMatrix[x][y][this.GREEN] = ((this.resultMatrix[x][y][1]/this.appiledkernelMatrix[x][y])%256);
				this.resultMatrix[x][y][this.BLUE] = ((this.resultMatrix[x][y][2]/this.appiledkernelMatrix[x][y])%256);
				imageOut.setIntColor(x,y,imageIn.getAlphaComponent(x, y), Math.floor(this.resultMatrix[x][y][0]), Math.floor(this.resultMatrix[x][y][1]), Math.floor(this.resultMatrix[x][y][2]));
			}		
		}
	}

	/*
	 * Calc Gaussian Matrix.
	 */
	 GaussianBlur.prototype.getGaussianKernel = function(){
		var l_matrix = MarvinJSUtils.createMatrix2D((this.radius*2)+1, (this.radius*2)+1);
		var l_q=this.radius/3.0;
		var l_distance;
		var l_x;
		var l_y;
		
		for(var x=1; x<=(this.radius*2)+1; x++){
			for(var y=1; y<=(this.radius*2)+1; y++){
				l_x = Math.abs(x-(this.radius+1));
				l_y = Math.abs(y-(this.radius+1));
				l_distance = Math.sqrt((l_x*l_x)+(l_y*l_y));
				l_matrix[y-1][x-1] = ( (1.0/(2.0*Math.PI*l_q*l_q))* Math.exp( (-(l_distance*l_distance)) / (2.0*l_q*l_q) ) );
			}
		}
		return l_matrix;
	}

	/*
	 * Apply the blur matrix on a image region. 
	 */
	GaussianBlur.prototype.applyKernel = function(centerPixel_X, centerPixel_Y, pixelColor, image)
	{
		for(var y=centerPixel_Y; y<centerPixel_Y+(this.radius*2); y++){
			for(var x=centerPixel_X; x<centerPixel_X+(this.radius*2); x++){
				if(x-this.radius >= 0 && x-this.radius < image.getWidth() && y-this.radius >= 0 && y-this.radius < image.getHeight()){
					this.resultMatrix[x-this.radius][y-this.radius][this.RED]+= (((pixelColor & 0x00FF0000) >>> 16)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.resultMatrix[x-this.radius][y-this.radius][this.GREEN]+= (((pixelColor & 0x0000FF00) >>> 8)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.resultMatrix[x-this.radius][y-this.radius][this.BLUE]+= ((pixelColor & 0x000000FF)*this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y]);
					this.appiledkernelMatrix[x-this.radius][y-this.radius] += this.kernelMatrix[x-centerPixel_X][y-centerPixel_Y];
				}
			}
		}
	}