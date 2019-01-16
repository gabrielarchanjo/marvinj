function MarvinImage(width, height, colorModel){
	// properties
	this.image = null;
	this.canvas = null;
	this.ctx=null;
	this.data = null;
	
	if(colorModel == null){
		this.colorModel = MarvinImage.COLOR_MODEL_RGB;
	} else{
		this.colorModel = colorModel;
	}
	
	if(width != null){
		this.create(width, height);
	}
	
	if(colorModel == MarvinImage.COLOR_MODEL_BINARY){
		this.arrBinaryColor = new Array(width*height);
	}
}

MarvinImage.COLOR_MODEL_RGB = 0;
MarvinImage.COLOR_MODEL_BINARY = 1;

MarvinImage.prototype.create = function(width, height){
	this.canvas = document.createElement('canvas');
	this.canvas.width = width;
	this.canvas.height = height;
	this.ctx = this.canvas.getContext("2d");
	this.imageData = this.ctx.getImageData(0, 0, width, height);
	this.width = width;
	this.height = height;
};

MarvinImage.prototype.setDimension = function(width, height){
	this.create(width, height);
};

MarvinImage.prototype.load = function(url, callback){
	this.onload = callback;
	this.image = new Image();
	var ref = this;
	this.image.onload = function(){ref.callbackImageLoaded(ref)};
	this.image.crossOrigin="anonymous";
	this.image.src = url;
};

// WARN: the callback "this" object is the reference to js Image object. 
MarvinImage.prototype.callbackImageLoaded = function(marvinImage){
	marvinImage.width = marvinImage.image.width;
	marvinImage.height = marvinImage.image.height;
	marvinImage.canvas = document.createElement('canvas');
	marvinImage.canvas.width = marvinImage.image.width;
	marvinImage.canvas.height = marvinImage.image.height;
	
	
	marvinImage.ctx = marvinImage.canvas.getContext("2d");
	marvinImage.ctx.drawImage(marvinImage.image, 0, 0);
	
	this.imageData = marvinImage.ctx.getImageData(0, 0, marvinImage.getWidth(), marvinImage.getHeight());
	
	if(marvinImage.onload!=null){
		marvinImage.onload();
	}
};

MarvinImage.prototype.clone = function(){
	var image = new MarvinImage(this.getWidth(), this.getHeight(), this.colorModel);
	MarvinImage.copyColorArray(this, image);
	return image;
};

MarvinImage.prototype.update = function(color){
	this.canvas.getContext("2d").putImageData(this.imageData, 0,0);
};

MarvinImage.prototype.clear = function(color){
	for(var y=0; y<this.getHeight(); y++){
		for(var x=0; x<this.getWidth(); x++){
			this.setIntColor(x,y,color);
		}
	}
};

MarvinImage.prototype.getColorModel = function(){
	return this.colorModel;
};

MarvinImage.prototype.getAlphaComponent = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+3];
};


MarvinImage.prototype.setAlphaComponent = function(x,y, alpha){
	var start = ((y*this.getWidth())+x)*4; 
	this.imageData.data[start+3] = alpha;
};

MarvinImage.prototype.getIntComponent0 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start];
};

MarvinImage.prototype.getIntComponent1 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+1];
};

MarvinImage.prototype.getIntComponent2 = function(x,y){
	var start = ((y*this.getWidth())+x)*4; 
	return this.imageData.data[start+2];
};

MarvinImage.prototype.setIntColor = function(x,y, a1, a2, a3, a4){
	if(a2 == null){
		this.setIntColor1(x,y,a1);
	} else if(a3 == null && a4 == null){ 
		this.setIntColor2(x,y,a1,a2);
	}
	else if(a4 == null){
		this.setIntColor3(x,y,a1,a2,a3);
	}
	else{
		this.setIntColor4(x,y,a1,a2,a3,a4);
	}
};

MarvinImage.prototype.getIntColor = function(x,y){
	var start = ((y*this.getWidth())+x)*4;
	
	return 	0x100000000 + 
			(this.imageData.data[start+3] << 24) + 
			(this.imageData.data[start] << 16) +
			(this.imageData.data[start+1] << 8) +
			(this.imageData.data[start+2]);
};

MarvinImage.prototype.setIntColor1 = function(x,y, color){
	var a = (color & 0xFF000000) >>> 24;
	var r = (color & 0x00FF0000) >> 16;
	var g = (color & 0x0000FF00) >> 8;
	var b = color & 0x000000FF;
	this.setIntColor4(x,y,a,r,g,b);
};

MarvinImage.prototype.setBinaryColor = function(x,y,value){
	var pos = ((y*this.getWidth())+x);
	this.arrBinaryColor[pos] = value;
};

MarvinImage.prototype.getBinaryColor = function(x,y){
	var pos = ((y*this.getWidth())+x);
	return this.arrBinaryColor[pos];
};

MarvinImage.copyColorArray = function(imgSource, imgDestine){
		
	if(imgSource.getColorModel() == imgDestine.getColorModel()){
		switch(imgSource.getColorModel()){
			case MarvinImage.COLOR_MODEL_RGB:
				for(var i=0; i<imgSource.imageData.data.length; i++){
					imgDestine.imageData.data[i] = imgSource.imageData.data[i];
				}
				break;
			case MarvinImage.COLOR_MODEL_BINARY:
				for(var i=0; i<imgSource.arrBinaryColor.length; i++){
					imgDestine.arrBinaryColor[i] = imgSource.arrBinaryColor[i];
				}
				break;
		}
	}
};

MarvinImage.prototype.drawRect = function(x,y, width, height, color){
	for(var i=x; i<x+width; i++){
		this.setIntColor(i, y, color);
		this.setIntColor(i, y+(height-1), color);
	}
	
	for(var i=y; i<y+height; i++){
		this.setIntColor(x, i, color);
		this.setIntColor(x+(width-1), i, color);
	}
};

MarvinImage.prototype.fillRect = function(x,y, width, height, color){
	for(var i=x; i<x+width; i++){
		for(var j=y; j<y+height; j++){
			if(i < this.getWidth() && j < this.getHeight()){
				this.setIntColor(i,j,color);
			}
		}
	}
};

MarvinImage.prototype.setColorToAlpha = function(color, alpha){
	for(var y=0; y<this.height; y++){
		for(var x=0; x<this.width; x++){
			if((this.getIntColor(x,y) & 0x00FFFFFF) == (color & 0x00FFFFFF)){
				this.setAlphaComponent(x,y,alpha);
			}
		}
	}
};

MarvinImage.prototype.setAlphaToColor = function(color){
	for(var y=0; y<this.height; y++){
		for(var x=0; x<this.width; x++){
			if(this.getAlphaComponent(x, y) == 0){
				this.setIntColor(x, y, 0xFFFFFFFF);
			}
		}
	}
};

MarvinImage.prototype.setIntColor2 = function(x,y, alpha, color){
	var r = (color & 0x00FF0000) >> 16;
	var g = (color & 0x0000FF00) >> 8;
	var b = color & 0x000000FF;
	this.setIntColor4(x,y,alpha,r,g,b);
};

MarvinImage.prototype.setIntColor3 = function(x,y, r, g, b){
	this.setIntColor4(x,y,255,r,g,b);
};

MarvinImage.prototype.setIntColor4 = function(x,y, alpha, r, g, b){
	var start = ((y*this.getWidth())+x)*4;
	this.imageData.data[start] = r;
	this.imageData.data[start+1] = g;
	this.imageData.data[start+2] = b;
	this.imageData.data[start+3] = alpha;
};

MarvinImage.prototype.getWidth = function(){
	return this.width;
};

MarvinImage.prototype.getHeight = function(){
	return this.height;
};

MarvinImage.prototype.isValidPosition = function(x, y){
	if(x >= 0 && x < this.width && y >= 0 && y < this.height){
		return true;
	}
	return false;
};

MarvinImage.prototype.draw = function(canvas, x, y, alphaCombination){
	if(x == null){x=0;}
	if(y == null){y=0;}
	canvas.getContext("2d").putImageData(this.imageData, x,y);/*
	if(alphaCombination == null || !alphaCombination){
		canvas.getContext("2d").putImageData(this.imageData, x,y);
	} else{
		this.imageData = this.ctx.getImageData(0, 0, width, height);
		var c = document.createElement('canvas');
		c.width = this.width;
		c.height = this.height;
		c.getContext('2d').putImageData(this.imageData,x,y); 
		var img = new Image();
		img.src = c.toDataURL();
		canvas.getContext("2d").drawImage(img, x, y);
	}*/
};

MarvinImage.prototype.toBlob = function(){
	this.update();
	return MarvinImage.dataURItoBlob(this.canvas.toDataURL("image/png"));
};

MarvinImage.dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
