	function Closing(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	Closing.prototype.load = function(){
		this.matrix = MarvinJSUtils.createMatrix2D(3,3,true);
		this.setAttribute("matrix",3);
	};

	
	Closing.prototype.process = function
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

			Marvin.morphologicalDilation(imgIn, imgOut, matrix);
			MarvinImage.copyColorArray(imgOut, imgIn);
			Marvin.morphologicalErosion(imgIn, imgOut, matrix);
		}
	};
