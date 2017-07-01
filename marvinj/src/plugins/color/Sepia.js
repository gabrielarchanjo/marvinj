	function Sepia(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}	
	
	Sepia.prototype.load = function() {
		this.setAttribute("txtValue", "20");
		this.setAttribute("intensity", 20);
	}

	Sepia.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		var r, g, b, depth, corfinal;
		
		//Define a intensidade do filtro...
		depth = this.getAttribute("intensity");
		
		var width    = imageIn.getWidth();
		var height   = imageIn.getHeight();
		
		var l_arrMask = mask.getMask();
		
		for (var x = 0; x < imageIn.getWidth(); x++) {
			for (var y = 0; y < imageIn.getHeight(); y++) {
				if(l_arrMask != null && !l_arrMask[x][y]){
					continue;
				}
				//Captura o RGB do ponto...
				r = imageIn.getIntComponent0(x, y);
				g = imageIn.getIntComponent1(x, y);
				b = imageIn.getIntComponent2(x, y);
				
				//Define a cor como a média aritmética do pixel...
				corfinal = (r + g + b) / 3;
				r = g = b = corfinal;
				 
				r = this.truncate(r + (depth * 2));
				g = this.truncate(g + depth);
			
				//Define a nova cor do ponto...
				imageOut.setIntColor(x, y, imageIn.getAlphaComponent(x, y), r, g, b);
			}
		}
	}

	/**
	 * Sets the RGB between 0 and 255
	 * @param a
	 * @return
	 */
	Sepia.prototype.truncate = function(a) {
		if      (a <   0) return 0;
		else if (a > 255) return 255;
		else              return a;
	}
