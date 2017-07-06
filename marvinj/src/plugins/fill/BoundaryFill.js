	function BoundaryFill(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	BoundaryFill.prototype.load = function(){
		this.setAttribute("x", 0);
		this.setAttribute("y", 0);
		this.setAttribute("color", 0xFFFF0000);
		this.setAttribute("tile", null);
		this.setAttribute("threshold", 0);
	};

	BoundaryFill.prototype.process = function
	(
		imgIn, 
		imgOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var l_list = new Array();
    	var 	l_point,
    			l_pointW,
    			l_pointE;
    
    	//MarvinImage.copyColorArray(imgIn, imgOut);
    	
    	var x = this.getAttribute("x");
    	var y = this.getAttribute("y");
    	var tileImage = this.getAttribute("tile");
    	this.threshold = this.getAttribute("threshold");
    	
    	if(!imgOut.isValidPosition(x, y)){
    		return;
    	}
    	
    	var targetColor = imgIn.getIntColor(x, y);
    	var targetRed = imgIn.getIntComponent0(x, y);
    	var targetGreen = imgIn.getIntComponent1(x, y);
    	var targetBlue = imgIn.getIntComponent2(x, y);
    	var color = this.getAttribute("color");
    	var newColor = color;
    	
    	var fillMask = MarvinJSUtils.createMatrix2D(imgOut.getWidth(), imgOut.getHeight, false);
    	fillMask[x][y] = true;
    	
    	
    	l_list.push(new MarvinPoint(x, y));
    	
    	//for(var l_i=0; l_i<l_list.size(); l_i++){
    	while(l_list.length > 0){
			l_point = l_list.splice(0,1)[0];	// list poll
    		l_pointW = new MarvinPoint(l_point.x, l_point.y);
    		l_pointE = new MarvinPoint(l_point.x, l_point.y);
    		
    		// west
    		while(true){
    			if(l_pointW.x-1 >= 0 && this.match(imgIn, l_pointW.x-1, l_pointW.y, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_pointW.x-1][l_pointW.y]){
    				l_pointW.x--;
    			}
    			else{
    				break;
    			}
    		 }
    		
    		// east
    		while(true){
    			if(l_pointE.x+1 < imgIn.getWidth() && this.match(imgIn, l_pointE.x+1, l_pointE.y, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_pointE.x+1][l_pointE.y]){
    				l_pointE.x++;
    			}
    			else{
    				break;
    			}
    		 }
    		
    		// set color of pixels between pointW and pointE
    		for(var l_px=l_pointW.x; l_px<=l_pointE.x; l_px++){
    			//imgOut.setIntColor(l_px, l_point.y, -1);
    			//drawPixel(imgOut, l_px, l_point.y, newColor, tileImage);
    			fillMask[l_px][l_point.y] = true;
    			
    			if(l_point.y-1 >= 0 && this.match(imgIn, l_px, l_point.y-1, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_px][l_point.y-1]){
    				l_list.push(new MarvinPoint(l_px, l_point.y-1));
    			}
    			if(l_point.y+1 < imgOut.getHeight() && this.match(imgIn, l_px, l_point.y+1, targetRed, targetGreen, targetBlue, this.threshold) && !fillMask[l_px][l_point.y+1]){
    				l_list.push(new MarvinPoint(l_px, l_point.y+1));
    			}
    		}
    	}    
    	
    	if(tileImage != null){
			/* Plugin not ported yet. */
			/*
    		var p = MarvinPluginLoader.loadImagePlugin("org.marvinproject.image.texture.tileTexture.jar");
    		p.setAttribute("lines", (int)(Math.ceil((double)imgOut.getHeight()/tileImage.getHeight())));
    		p.setAttribute("columns", (int)(Math.ceil((double)imgOut.getWidth()/tileImage.getWidth())));
    		p.setAttribute("tile", tileImage);
    		MarvinImageMask newMask = new MarvinImageMask(fillMask);    		
    		p.process(imgOut, imgOut, null, newMask, false);
			*/
    	}
    	else{
    		for(var j=0; j<imgOut.getHeight(); j++){
    			for(var i=0; i<imgOut.getWidth(); i++){
    				if(fillMask[i][j]){
    					imgOut.setIntColor(i, j, newColor);
    				}
    			}
    		}
    	}
    };
	
	BoundaryFill.prototype.match = function(image, x, y, targetRed, targetGreen, targetBlue, threshold){
		var diff = Math.abs(image.getIntComponent0(x, y) - targetRed) + Math.abs(image.getIntComponent1(x, y) - targetGreen) + Math.abs(image.getIntComponent2(x, y) - targetBlue);
		return (diff <= threshold);
	};
