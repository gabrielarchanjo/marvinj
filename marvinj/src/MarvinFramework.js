var marvinLoadPluginMethods = function(callback){
	Marvin.plugins = new Object();
	
	// Alpha Boundary
	Marvin.plugins.alphaBoundary = new AlphaBoundary();
	Marvin.alphaBoundary = function(imageIn, imageOut, radius){
		Marvin.plugins.alphaBoundary.setAttribute("radius", radius)
		Marvin.plugins.alphaBoundary.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Average Color
	Marvin.plugins.averageColor = new AverageColor();
	Marvin.averageColor = function(imageIn){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.averageColor.process(imageIn, null, attrOut, MarvinImageMask.NULL_MASK, false);
		return attrOut.get("averageColor");
	};
	
	// Black And White
	Marvin.plugins.blackAndWhite = new BlackAndWhite();
	Marvin.blackAndWhite = function(imageIn, imageOut, level){
		Marvin.plugins.blackAndWhite.setAttribute("level", level);
		Marvin.plugins.blackAndWhite.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// BoundaryFill
	Marvin.plugins.boundaryFill = new BoundaryFill();
	Marvin.boundaryFill = function(imageIn, imageOut, x, y, color, threshold){
		Marvin.plugins.boundaryFill.setAttribute("x", x);
		Marvin.plugins.boundaryFill.setAttribute("y", y);
		Marvin.plugins.boundaryFill.setAttribute("color", color);
		if(threshold != null){	Marvin.plugins.boundaryFill.setAttribute("threshold", threshold);	}
		
		Marvin.plugins.boundaryFill.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
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
	
	// Color Channel
	Marvin.plugins.crop = new Crop();
	Marvin.crop = function(imageIn, imageOut, x, y, width, height){
		Marvin.plugins.crop.setAttribute("x", x);
		Marvin.plugins.crop.setAttribute("y", y);
		Marvin.plugins.crop.setAttribute("width", width);
		Marvin.plugins.crop.setAttribute("height", height);
		Marvin.plugins.crop.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Combine by Alpha
	Marvin.plugins.combineByAlpha = new CombineByAlpha();
	Marvin.combineByAlpha = function(imageIn, imageOther, imageOut, x, y){
		Marvin.plugins.combineByAlpha.setAttribute("imageOther", imageOther);
		Marvin.plugins.combineByAlpha.setAttribute("x", x);
		Marvin.plugins.combineByAlpha.setAttribute("y", y);
		Marvin.plugins.combineByAlpha.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Emboss
	Marvin.plugins.emboss = new Emboss();
	Marvin.emboss = function(imageIn, imageOut){
		Marvin.plugins.emboss.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Emboss
	Marvin.plugins.halftoneErrorDiffusion = new ErrorDiffusion();
	Marvin.halftoneErrorDiffusion = function(imageIn, imageOut){
		Marvin.plugins.halftoneErrorDiffusion.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// FindTextRegions
	Marvin.plugins.findTextRegions = new FindTextRegions();
	Marvin.findTextRegions = function(imageIn, maxWhiteSpace, maxFontLineWidth, minTextWidth, grayScaleThreshold){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.findTextRegions.setAttribute("maxWhiteSpace", Marvin.getValue(maxWhiteSpace, 10));
		Marvin.plugins.findTextRegions.setAttribute("maxFontLineWidth", Marvin.getValue(maxFontLineWidth, 10));
		Marvin.plugins.findTextRegions.setAttribute("minTextWidth", Marvin.getValue(minTextWidth, 30));
		Marvin.plugins.findTextRegions.setAttribute("grayScaleThreshold", Marvin.getValue(grayScaleThreshold, 127));
		Marvin.plugins.findTextRegions.process(imageIn, null, attrOut,  MarvinImageMask.NULL_MASK, false);
		return attrOut.get("matches");
	};
	
	// Floodfill Segmentation
	Marvin.plugins.floodfillSegmentation = new FloodfillSegmentation();
	Marvin.floodfillSegmentation = function(imageIn){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.floodfillSegmentation.setAttribute("returnType", "MarvinSegment");
		Marvin.plugins.floodfillSegmentation.process(imageIn, null, attrOut, MarvinImageMask.NULL_MASK, false);
		return attrOut.get("segments");
	};
	
	// Gaussian Blur
	Marvin.plugins.gaussianBlur = new GaussianBlur();
	Marvin.gaussianBlur = function(imageIn, imageOut, radius){
		Marvin.plugins.gaussianBlur.setAttribute("radius", Marvin.getValue(radius, 3.0));
		Marvin.plugins.gaussianBlur.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Invert
	Marvin.plugins.invertColors = new Invert();
	Marvin.invertColors = function(imageIn, imageOut){
		Marvin.plugins.invertColors.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	Marvin.plugins.iteratedFunctionSystem = new IteratedFunctionSystem();
	Marvin.iteratedFunctionSystem = function(imageIn, imageOut, rules, iterations){
		Marvin.plugins.iteratedFunctionSystem.setAttribute("rules", rules);
		Marvin.plugins.iteratedFunctionSystem.setAttribute("iterations", iterations);
		Marvin.plugins.iteratedFunctionSystem.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// GrayScale
	Marvin.plugins.grayScale = new GrayScale();
	Marvin.grayScale = function(imageIn, imageOut){
		Marvin.plugins.grayScale.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	//Merge Photos
	Marvin.plugins.mergePhotos = new MergePhotos();
	Marvin.mergePhotos = function(images, imageOut, threshold){
		Marvin.plugins.mergePhotos.setAttribute("threshold", threshold);
		Marvin.plugins.mergePhotos.process(images, imageOut);
	};
	
	// Moravec
	Marvin.plugins.moravec = new Moravec();
	Marvin.moravec = function(imageIn, imageOut, matrixSize, threshold){
		var attrOut = new MarvinAttributes();
		Marvin.plugins.moravec.setAttribute("matrixSize", matrixSize);
		Marvin.plugins.moravec.setAttribute("threshold", threshold);
		Marvin.plugins.moravec.process(imageIn, imageOut, attrOut, MarvinImageMask.NULL_MASK, false);
		return attrOut.get("cornernessMap");
	};
	
	// Morphological Dilation
	Marvin.plugins.morphologicalDilation = new Dilation();
	Marvin.morphologicalDilation = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalDilation.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalDilation.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Morphological Erosion
	Marvin.plugins.morphologicalErosion = new Erosion();
	Marvin.morphologicalErosion = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalErosion.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalErosion.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Morphological Closing
	Marvin.plugins.morphologicalClosing = new Closing();
	Marvin.morphologicalClosing = function(imageIn, imageOut, matrix){
		Marvin.plugins.morphologicalClosing.setAttribute("matrix", matrix);
		Marvin.plugins.morphologicalClosing.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Prewitt
	Marvin.plugins.prewitt = new Prewitt();
	Marvin.prewitt = function(imageIn, imageOut, intensity){
		Marvin.plugins.prewitt.setAttribute("intensity", Marvin.getValue(intensity, 1.0));
		Marvin.plugins.prewitt.process(imageIn, imageOut, null, MarvinImageMask.NULL_MASK, false);
	};
	
	// Scale
	Marvin.plugins.scale = new Scale();
	Marvin.scale = function(imageIn, imageOut, newWidth, newHeight){
	
		if(newHeight == null){
			var factor = imageIn.getHeight() / imageIn.getWidth();
			newHeight = Math.floor(factor * newWidth);
		}
	
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

Marvin.getValue = function(value, defaultValue){
	if(value != null){
		return value;
	} else {
		return defaultValue;
	}
}

marvinLoadPluginMethods();
