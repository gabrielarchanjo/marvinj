	function FloodfillSegmentation(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	FloodfillSegmentation.prototype.load = function(){
		this.setAttribute("returnType", "MarvinSegment");
	};
	
	FloodfillSegmentation.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		if(attributesOut != null){
			var returnType = this.getAttribute("returnType");
			var fillBuffer = imageIn.clone();
			var segments = this.floodfillSegmentation(imageIn, fillBuffer);
			
			switch(returnType){
				case "MarvinSegment":
					attributesOut.set("segments", segments);
					break;
				case "MarvinBlobSegment":
					attributesOut.set("blobSegments", blobSegments(fillBuffer, segments));
					break;
			}
		}
	};
	
	FloodfillSegmentation.prototype.floodfillSegmentation = function(image, fillBuffer){
		fillBuffer.clear(0xFF000000);
		
		var currentColor=1;
		for(var y=0; y<image.getHeight(); y++){
			for(var x=0; x<image.getWidth(); x++){
				
				var color = fillBuffer.getIntColor(x, y);
				
				if((color & 0x00FFFFFF) == 0 && image.getAlphaComponent(x, y) > 0){
					var c = 0xFF000000 | (currentColor++);
					Marvin.boundaryFill(image, fillBuffer, x, y, c);
				}
			}
		}
		
		var segments = new Array(currentColor-1);
		var seg;
		for(var y=0; y<fillBuffer.getHeight(); y++){
			for(var x=0; x<fillBuffer.getWidth(); x++){
				var color = (fillBuffer.getIntColor(x, y) & 0x00FFFFFF);
				
				if(color != 0x00FFFFFF && color > 0){
					
					seg = segments[color-1];
					
					if(seg == null){
						seg = new MarvinSegment();
						segments[color-1] = seg;
					}
					
					// x and width
					if(seg.x1 == -1 || x < seg.x1)	{		seg.x1 = x;		}
					if(seg.x2 == -1 || x > seg.x2)	{		seg.x2 = x;		}
					seg.width = (seg.x2-seg.x1)+1;
					
					// y and height;
					if(seg.y1 == -1 || y < seg.y1)	{		seg.y1 = y;		}
					if(seg.y2 == -1 || y > seg.y2)	{		seg.y2 = y;		}
					seg.height = (seg.y2-seg.y1)+1;
					
					seg.area++;
				}
			}
		}
		
		return segments;
	}
	
	FloodfillSegmentation.prototype.blobSegments = function(image, segments){
		
		var blobSegments = new Array(segments.length);
		
		var colorSegment;
		var seg;
		for(var i=0; i<segments.length; i++){
			seg = segments[i];
			colorSegment = 0xFF000000 + (i+1);
			
			blobSegments[i] = new MarvinBlobSegment(seg.x1, seg.y1);
			var tempBlob = new MarvinBlob(seg.width, seg.height);
			blobSegments[i].setBlob(tempBlob);
			
			for(var y=seg.y1; y<=seg.y2; y++){
				for(var x=seg.x1; x<=seg.x2; x++){
					if(image.getIntColor(x,y) == colorSegment){
						tempBlob.setValue(x-seg.x1, y-seg.y1, true);
					}
				}
			}
			
		}
		return blobSegments;
	};
