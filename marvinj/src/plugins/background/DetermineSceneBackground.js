	function DetermineSceneBackground(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}

	DetermineSceneBackground.prototype.load = function() {
		this.setAttribute("threshold", 30);
	}
	
	
	DetermineSceneBackground.prototype.process = function
	(
		images,
		imageOut
	)
	{
		var threshold = this.getAttribute("threshold");
		var image0 = images[0];
		for(var y=0; y<image0.getHeight(); y++){
			for(var x=0; x<image0.getWidth(); x++){
				imageOut.setIntColor(x, y, this.getBackgroundPixel(x,y, images, threshold));
			}
		}	
	}
	
	DetermineSceneBackground.prototype.getBackgroundPixel = function(x, y, images, threshold){
		var colors = new Array();
		for(var i in images){
			var img = images[i];
			var c = new Array(4);
			c[0] = img.getIntComponent0(x, y);
			c[1] = img.getIntComponent1(x, y);
			c[2] = img.getIntComponent2(x, y);
			c[3] = 0;
			
			if(colors.length == 0){
				colors.push(c);
			}
			else{
				var found=false;
				for(var j in colors){
					var c2 = colors[j];
					if
					(
						Math.abs(c2[0]-c[0]) < threshold*0.3 &&
						Math.abs(c2[1]-c[1]) < threshold*0.3 &&
						Math.abs(c2[2]-c[2]) < threshold*0.3
					){
						c2[0] = Math.floor((c2[0]+c[0])/2);
						c2[1] = Math.floor((c2[1]+c[1])/2);
						c2[2] = Math.floor((c2[2]+c[2])/2);
						c2[3]++;
						found=true;
						break;
					}
				}
				
				if(!found){
					colors.push(c);
				}
			}
		}
		
		var max=-1;
		var maxIndex=0;
		var c2 = null;
		for(var i=0; i<colors.length; i++){
			c2 = colors[i];
			if(max == -1 || c2[3] > max){
				max = c2[3];
				maxIndex = i; 
			}
		}
		c2 = colors[maxIndex];
		return 0xFF000000 + (c2[0] << 16) + (c2[1] << 8) + c2[2]; 
	}
