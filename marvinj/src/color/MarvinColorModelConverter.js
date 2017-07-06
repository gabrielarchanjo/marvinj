function MarvinColorModelConverter(){}

MarvinColorModelConverter.rgbToBinary = function(img, threshold){		
	var resultImage = new MarvinImage(img.getWidth(), img.getHeight(), MarvinImage.COLOR_MODEL_BINARY);

	for(var y=0; y<img.getHeight(); y++){
		for(var x=0; x<img.getWidth(); x++){
			var gray = Math.ceil(((img.getIntComponent0(x, y)*0.3)+(img.getIntComponent1(x, y)*0.59)+(img.getIntComponent2(x, y)*0.11)));
			
			if(gray <= threshold){
				resultImage.setBinaryColor(x, y, true);
			}
			else{
				resultImage.setBinaryColor(x, y, false);
			}
		}
	}
	return resultImage;
};

MarvinColorModelConverter.binaryToRgb = function(img){
	var resultImage = new MarvinImage(img.getWidth(), img.getHeight(), MarvinImage.COLOR_MODEL_RGB);

	for(var y=0; y<img.getHeight(); y++){
		for(var x=0; x<img.getWidth(); x++){
			if(img.getBinaryColor(x, y)){
				resultImage.setIntColor(x, y, 255, 0,0,0);
			}
			else{
				resultImage.setIntColor(x, y, 255, 255,255,255);
			}
		}
	}
	return resultImage;
};
	
MarvinColorModelConverter.rgbToHsv = function(rgbArray){
	var hsvArray = new Array(rgbArray.length*3);
	
	var red,green,blue;
	for(var i=0; i<rgbArray.length; i++){
		red = (rgbArray[i] & 0xFF0000) >>> 16;
		green = (rgbArray[i] & 0x00FF00) >>> 8;
		blue = (rgbArray[i] & 0x0000FF);
		
		red /=255.0;
		green /=255.0;
		blue /=255.0;
		
		var max = Math.max(Math.max(red, green), blue);
		var min = Math.min(Math.min(red, green), blue);
		var c = max-min;
		
		// H 
		var h,s,v;
		if(c !=0 ){
			if(max == red){
				if(green >= blue){
					h = 60 * ((green-blue)/c);
				} else{
					h = 60 * ((green-blue)/c) + 360;
				}
			} else if(max == green){
				h = 60 * ((blue-red)/c) + 120;
			} else{
				h = 60 * ((red-green)/c) + 240;
			}
		} else{
			h = 0;
		}
		
		
		// V
		v = max;
		
		// S
		s = (c!=0? c/v : 0);
		
		hsvArray[(i*3)] = h;
		hsvArray[(i*3)+1] = s;
		hsvArray[(i*3)+2] = v;
		
	}
	return hsvArray;
};
	
MarvinColorModelConverter.hsvToRgb = function(hsvArray){
	var rgbArray = new Array(hsvArray.length/3);
	
	for(var i=0, j=0; i<hsvArray.length; i+=3, j++){
		var h = hsvArray[i];
		var s = hsvArray[i+1];
		var v = hsvArray[i+2];
		
		// HSV to RGB
		var hi = Math.ceil(h/60 % 6);
		var f = (h/60) - hi;
		var p = v * (1-s);
		var q = v * (1 - f*s);
		var t = v * (1 - (1 - f) * s);
		
		var iHi = Math.ceil(hi);
		
		var r=0,g=0,b=0;
		
		switch(iHi){
			case 0:	r = Math.ceil(v*255);	g = Math.ceil(t*255);	b = Math.ceil(p*255);	break;
			case 1:	r = Math.ceil(q*255);	g = Math.ceil(v*255);	b = Math.ceil(p*255);	break; 
			case 2:	r = Math.ceil(p*255);	g = Math.ceil(v*255);	b = Math.ceil(t*255);	break; 
			case 3:	r = Math.ceil(p*255);	g = Math.ceil(q*255);	b = Math.ceil(v*255);	break; 
			case 4:	r = Math.ceil(t*255);	g = Math.ceil(p*255);	b = Math.ceil(v*255);	break;
			case 5:	r = Math.ceil(v*255);	g = Math.ceil(p*255);	b = Math.ceil(q*255);	break;
		}
		
		rgbArray[j] = 0xFF000000 + (r << 16) + (g << 8) + b; 
		
	}
	
	return rgbArray;
};