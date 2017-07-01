marvinLoadPluginMethods = function(callback){
	Marvin.plugins = new Object();
	
	// Alpha Boundary
	Marvin.plugins.alphaBoundary = new AlphaBoundary();
	Marvin.alphaBoundary = function(imageIn, imageOut, radius){
		Marvin.plugins.alphaBoundary.setAttribute(radius)
		Marvin.plugins.alphaBoundary.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Black And White
	Marvin.plugins.blackAndWhite = new BlackAndWhite();
	Marvin.blackAndWhite = function(imageIn, imageOut, level){
		Marvin.plugins.blackAndWhite.setAttribute("level", level);
		Marvin.plugins.blackAndWhite.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Brightness and Contrast
	Marvin.plugins.brightnessAndContrast = new BrightnessAndContrast();
	Marvin.brightnessAndContrast = function(imageIn, imageOut, brightness, contrast){
		Marvin.plugins.brightnessAndContrast.setAttribute("brightness", brightness);
		Marvin.plugins.brightnessAndContrast.setAttribute("contrast", contrast);
		Marvin.plugins.brightnessAndContrast.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Color Channel
	Marvin.plugins.colorChannel = new ColorChannel();
	Marvin.colorChannel = function(imageIn, imageOut, red, green, blue){
		Marvin.plugins.colorChannel.setAttribute("red", red);
		Marvin.plugins.colorChannel.setAttribute("green", green);
		Marvin.plugins.colorChannel.setAttribute("blue", blue);
		Marvin.plugins.colorChannel.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Emboss
	Marvin.plugins.emboss = new Emboss();
	Marvin.emboss = function(imageIn, imageOut){
		Marvin.plugins.emboss.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Gaussian Blur
	Marvin.plugins.gaussianBlur = new GaussianBlur();
	Marvin.gaussianBlur = function(imageIn, imageOut, radius){
		Marvin.plugins.gaussianBlur.setAttribute("radius", radius);
		Marvin.plugins.gaussianBlur.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Invert
	Marvin.plugins.invertColors = new Invert();
	Marvin.invertColors = function(imageIn, imageOut){
		Marvin.plugins.invertColors.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// GrayScale
	Marvin.plugins.grayScale = new GrayScale();
	Marvin.grayScale = function(imageIn, imageOut){
		Marvin.plugins.grayScale.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Morphological Dilation
	Marvin.plugins.morphologicalDilation = new Dilation();
	Marvin.morphologicalDilation = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalDilation.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalDilation.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Prewitt
	Marvin.plugins.prewitt = new Prewitt();
	Marvin.prewitt = function(imageIn, imageOut, intensity){
		if(intensity != null){
			Marvin.plugins.prewitt.setAttribute("intensity", intensity);
		}
		Marvin.plugins.prewitt.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Scale
	Marvin.plugins.scale = new Scale();
	Marvin.scale = function(imageIn, imageOut, newWidth, newHeight){
		Marvin.plugins.scale.setAttribute("newWidth", newWidth);
		Marvin.plugins.scale.setAttribute("newHeight", newHeight);
		Marvin.plugins.scale.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Sepia
	Marvin.plugins.sepia = new Sepia();
	Marvin.sepia = function(imageIn, imageOut, intensity){
		Marvin.plugins.sepia.setAttribute("intensity", intensity);
		Marvin.plugins.sepia.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Thresholding
	Marvin.plugins.thresholding = new Thresholding();
	Marvin.thresholding = function(imageIn, imageOut, threshold, thresholdRange){
		Marvin.plugins.thresholding.setAttribute("threshold", threshold);
		Marvin.plugins.thresholding.setAttribute("thresholdRange", thresholdRange);
		Marvin.plugins.thresholding.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// ThresholdingNeighborhood
	Marvin.plugins.thresholdingNeighborhood = new ThresholdingNeighborhood();
	Marvin.thresholdingNeighborhood = function(imageIn, imageOut, thresholdPercentageOfAverage, neighborhoodSide, samplingPixelDistance){
		Marvin.plugins.thresholdingNeighborhood.setAttribute("thresholdPercentageOfAverage", thresholdPercentageOfAverage);
		Marvin.plugins.thresholdingNeighborhood.setAttribute("neighborhoodSide", neighborhoodSide);
		Marvin.plugins.thresholdingNeighborhood.setAttribute("samplingPixelDistance", samplingPixelDistance);
		Marvin.plugins.thresholdingNeighborhood.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
}

var Marvin = new Object();
marvinLoadPluginMethods();
