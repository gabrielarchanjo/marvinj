

/**
 * @author Gabriel Ambrósio Archanjo
 */
	function Prewitt(){
		MarvinAbstractImagePlugin.super(this);
	
	
		// Definitions
		this.matrixPrewittX = [
				[1,		0,		-1],
				[1,		0,		-1],
				[1,		0,		-1]
		];
		
		this.matrixPrewittY = [
				[1,		1,		1],
				[0,		0,		0],
				[-1,	-1,		-1]
		];
		
		this.load();
		
	}
	
	Prewitt.prototype.load = function(){
		this.convolution = new Convolution();
		this.setAttribute("intensity", 1.0);
	};
	
	Prewitt.prototype.process = function
	(
		imageIn, 
		imageOut,
		attrOut,
		mask, 
		previewMode
	)
    {
		var intensity = this.getAttribute("intensity");
		
		if(intensity == 1){
			this.convolution.setAttribute("matrix", this.matrixPrewittX);
			this.convolution.process(imageIn, imageOut, null, mask, this.previewMode);
			this.convolution.setAttribute("matrix", this.matrixPrewittY);
			this.convolution.process(imageIn, imageOut, null, mask, this.previewMode);
		} else{
			this.convolution.setAttribute("matrix", MarvinMath.scaleMatrix(this.matrixPrewittX, intensity));
			this.convolution.process(imageIn, imageOut, null, mask, previewMode);
			this.convolution.setAttribute("matrix", MarvinMath.scaleMatrix(this.matrixPrewittY, intensity));
			this.convolution.process(imageIn, imageOut, null, mask, previewMode);
		}
    };
