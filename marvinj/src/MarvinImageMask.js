
	
	function MarvinImageMask (w, h){
		this.width = w;
		this.height = h;
		
		if(w != 0 && h != 0){
			this.arrMask = MarvinJSUtils.createMatrix2D(width, height);
		} else{
			this.arrMask = null;
		}
	};
	
	MarvinImageMask.prototype.getWidth = function(){
		return this.width;
	};
	
	MarvinImageMask.prototype.getHeight = function(){
		return this.height;
	};
	
	MarvinImageMask.prototype.addPixel = function(x, y){
		this.arrMask[x][y] = true;
	};
	
	MarvinImageMask.prototype.removePixel = function(x, y){
		this.arrMask[x][y] = false;
	};
	
	MarvinImageMask.prototype.clear = function(){
		if(this.arrMask != null){
			for(var y=0; y<height; y++){
				for(var x=0; x<width; x++){
					this.arrMask[x][y] = false;
				}
			}
		}
	};
	
	MarvinImageMask.prototype.getMask = function(){
		return this.arrMask;
	};
	
	MarvinImageMask.prototype.addRectRegion = function(startX, startY, regionWidth, regionHeight){
		for(var x=startX; x<startX+regionWidth; x++){
			for(var y=startY; y<startY+regionHeight; y++){
				this.arrMask[x][y] = true;
			}
		}
	};
	
	MarvinImageMask.createNullMask = function(){
		return new MarvinImageMask(0,0);
	};

	MarvinImageMask.NULL_MASK = MarvinImageMask.createNullMask();
