	function MergePhotos(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	MergePhotos.prototype.load = function() {
		this.background = new DetermineSceneBackground();
		this.background.load();
		this.setAttribute("threshold", 30);
	}
	
	MergePhotos.prototype.process = function
	(
		images,
		imageOut
	)
	{
		if(images.length > 0){
			var threshold = this.getAttribute("threshold");
			this.background.setAttribute("threshold", threshold);
			var backgroundImage = images[0].clone();
			this.background.process(images, backgroundImage);
			MarvinImage.copyColorArray(backgroundImage, imageOut);
			this.mergePhotos(images, imageOut, backgroundImage, threshold);
		}
	}
	
	MergePhotos.prototype.mergePhotos = function(images, imageOut, background, threshold){
		for(var i in images){
			var img = images[i];
			this.mergePhotosSingle(img, imageOut, background, threshold);
		}
	}
	
	MergePhotos.prototype.mergePhotosSingle = function(imageA, imageB, imageBackground, threshold){
			
		var rA, gA, bA, rB, gB, bB;
		for(var y=0; y<imageA.getHeight(); y++){
			for(var x=0; x<imageA.getWidth(); x++){
				
				rA = imageA.getIntComponent0(x, y);
				gA = imageA.getIntComponent1(x, y);
				bA = imageA.getIntComponent2(x, y);
				rB = imageBackground.getIntComponent0(x, y);
				gB = imageBackground.getIntComponent1(x, y);
				bB = imageBackground.getIntComponent2(x, y);
				
				if
				(
					Math.abs(rA-rB) > threshold || 
					Math.abs(gA-gB) > threshold ||
					Math.abs(bA-bB) > threshold
				){
					
					imageB.setIntColor(x, y, 255, rA, gA, bA);
				}
			}
		}
	}

