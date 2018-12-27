	function FindTextRegions(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	FindTextRegions.prototype.load = function() {
		this.setAttribute("maxWhiteSpace", 10);
		this.setAttribute("maxFontLineWidth", 10);
		this.setAttribute("minTextWidth", 30);
		this.setAttribute("grayScaleThreshold", 127);
	}
	
	FindTextRegions.prototype.process = function
	(
		imageIn, 
		imageOut,
		attrOut,
		mask, 
		previewMode
	){
		// The image will be affected so it's generated a new instance
		imageIn = imageIn.clone();
		
		var maxWhiteSpace = this.getAttribute("maxWhiteSpace");
		var maxFontLineWidth = this.getAttribute("maxFontLineWidth");
		var minTextWidth = this.getAttribute("minTextWidth");
		var grayScaleThreshold = this.getAttribute("grayScaleThreshold");
		
		
		Marvin.thresholding(imageIn, imageIn, grayScaleThreshold);
		
		var segments = [];
		for(var i=0; i<imageIn.getHeight(); i++){
			segments.push([]);
		}
		
		// map of already processed pixels
		
		var processed = MarvinJSUtils.createMatrix2D(imageIn.getWidth(), imageIn.getHeight, false);
		
		var color;
		var patternStartX=-1;
		var patternLength=0;
		var whitePixels=0;
		var blackPixels=0;
		for(var y=0; y<imageIn.getHeight(); y++){
			for(var x=0; x<imageIn.getWidth(); x++){
				
				if(!processed[x][y]){
					color = imageIn.getIntColor(x, y);
					
					if(color == 0xFFFFFFFF && patternStartX != -1){
						whitePixels++;
						blackPixels=0;
					}
					
					if(color == 0xFF000000){
						
						blackPixels++;
						
						if(patternStartX == -1){
							patternStartX = x;
						}
						
						whitePixels=0;
					}
					
					// check white and black pattern maximum lenghts
					if(whitePixels > maxWhiteSpace || blackPixels > maxFontLineWidth || x == imageIn.getWidth()-1){
						
						if(patternLength >= minTextWidth){
							var list = segments[y];
							list.push([patternStartX, y, patternStartX+patternLength, y]);
						} 
						
						whitePixels=0;
						blackPixels=0;
						patternLength=0;
						patternStartX=-1;
					}
					
					if(patternStartX != -1){
						patternLength++;
					}
					
					processed[x][y] = true;
				}
			}
		}
		
		
		// Group line patterns intersecting in x coordinate and too near in y coordinate.
		for(var y=0; y<imageIn.getHeight()-2; y++){
			
			var listY = segments[y];
			
			for(var w=y+1; w<=y+2; w++){
				
				var listW = segments[w];
				
				for(var i=0; i<listY.length; i++){
					var sA = listY[i];
					for(var j=0; j<listW.length; j++){
						
						
						var sB = listW[j];
						
						// horizontal intersection
						if
						(
							(sA[0] <= sB[0] && sA[2] >= sB[2]) ||
							(sA[0] >= sB[0] && sA[0] <= sB[2]) ||
							(sA[2] >= sB[0] && sA[2] <= sB[2])
							
						){
							sA[0] = Math.min(sA[0], sB[0]);
							sA[2] = Math.max(sA[2], sB[2]);
							sA[3] = sB[3];
							
							listY.splice(i, 1);
							i--;
							
							listW.splice(j, 1);
							listW.push(sA);
							
							break;
						}
					}
				}
			}
		}
		
		// Convert the result to a List<> of MarvinSegment objects.
		var marvinSegments = [];
		for(var y=0; y<imageIn.getHeight(); y++){
			var list = segments[y];
			for(var i in list){
				var seg = list[i];
				marvinSegments.push(new MarvinSegment(seg[0], seg[1], seg[2], seg[3]));
			}
		}
		
		attrOut.set("matches", marvinSegments);
	}
