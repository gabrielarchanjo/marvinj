	function IteratedFunctionSystem(){
		MarvinAbstractImagePlugin.super(this);
		this.load();
	}
	
	IteratedFunctionSystem.prototype.load = function(){
		this.rules = [];
		this.EXAMPLE_RULES = "0,0,0,0.16,0,0,0.01\n"+
											"0.85,0.04,-0.04,0.85,0,1.6,0.85\n"+
											"0.2,-0.26,0.23,0.22,0,1.6,0.07\n"+
											"-0.15,0.28,0.26,0.24,0,0.44,0.07\n";
											
		this.setAttribute("rules", this.EXAMPLE_RULES);
		this.setAttribute("iterations", 1000000);
	};

		/*
	private MarvinAttributesPanel	attributesPanel;
	private MarvinAttributes 		attributes;
	
	private List<Rule> rules;
	
	// Testing String
	private final static String EXAMPLE_RULES = 	"0,0,0,0.16,0,0,0.01\n"+
											"0.85,0.04,-0.04,0.85,0,1.6,0.85\n"+
											"0.2,-0.26,0.23,0.22,0,1.6,0.07\n"+
											"-0.15,0.28,0.26,0.24,0,0.44,0.07\n";
	@Override
	public void load() {
		attributes = getAttributes();
		attributes.set("rules", EXAMPLE_RULES);
		attributes.set("iterations", 1000000);
		
		rules = new ArrayList<Rule>();
	}
	*/

	IteratedFunctionSystem.prototype.process = function
	(
		imageIn, 
		imageOut,
		attributesOut,
		mask, 
		previewMode
	)
	{
		this.loadRules();
		var iterations = this.getAttribute("iterations");
		
		var x0 = 0;
		var y0 = 0;
		var x,y;
		var startX;
		var startY;
		var factor;
		
		var minX=999999999,minY=999999999,maxX=-999999999,maxY=-99999999;
		
		var tempRule;
		var point = [x0,y0];
		
		imageOut.clear(0xFFFFFFFF);
		
		for(var i=0; i<iterations; i++){
			tempRule = this.getRule();
			this.applyRule(point, tempRule);
			
			x = point[0];
			y = point[1];
			
			if(x < minX){	minX = x;	};
			if(x > maxX){	maxX = x;	};
			if(y < minY){	minY = y;	};
			if(y > maxY){	maxY = y;	};
		
		}	
		
		var width = imageOut.getWidth();
		var height = imageOut.getHeight();
		
		var deltaX = Math.abs(maxX-minX);
		var deltaY = Math.abs(maxY-minY); 
		if(deltaX > deltaY){
			factor = (width/deltaX);
			if(deltaY * factor > height){
				factor = factor * (height/(deltaY * factor));
			}
		}
		else{
			factor = (height/deltaY);
			if(deltaX * factor > width){
				factor = factor * (width/(deltaX * factor));
			}
		}
		
		factor *= 0.9;
		
		startX = Math.floor(((width/2)-((minX+((deltaX)/2))*factor)));
		startY = Math.floor((height-((height/2)-((minY+(deltaY/2))*factor))));
		
		point[0] = x0;
		point[1] = y0;
		
		for(var i=0; i<iterations; i++){
			tempRule = this.getRule();
			this.applyRule(point, tempRule);
			
			x = Math.floor((point[0]*factor)+startX);
			y = startY-Math.floor((point[1]*factor));
			
			if(x >= 0 && x<width && y >= 0 && y < height){
				imageOut.setIntColor(Math.floor(x),Math.floor(y) , 255, 0);
			}
		}
	}

	IteratedFunctionSystem.prototype.loadRules = function(){
		this.rules = [];
		var r = this.getAttribute("rules").split("\n");
		
		for(var i=0; i<r.length; i++){
			this.addRule(r[i]);
		}
	}

	IteratedFunctionSystem.prototype.addRule = function(rule){
		rule = rule.replace(/ /g, "");	//replace all spaces
		var attr = rule.split(",");
		
		if(attr.length == 7){
			var r = new Object();
			r.a = parseFloat(attr[0]);
			r.b = parseFloat(attr[1]);
			r.c = parseFloat(attr[2]);
			r.d = parseFloat(attr[3]);
			r.e = parseFloat(attr[4]);
			r.f = parseFloat(attr[5]);
			r.probability = parseFloat(attr[6]);
			
			
			/*
			(
				parseFloat(attr[0]),
				parseFloat(attr[1]),
				parseFloat(attr[2]),
				parseFloat(attr[3]),
				parseFloat(attr[4]),
				parseFloat(attr[5]),
				parseFloat(attr[6])
			);
			*/
			
			this.rules.push(r);
		}
	}
	
	IteratedFunctionSystem.prototype.getRule = function(){
		var random = Math.random();
		var sum=0;
		var i;
		for(i=0; i<this.rules.length; i++){
			sum += this.rules[i].probability;
			if(random < sum){
				return this.rules[i];
			}
		}
		
		if(i != 0){
			return this.rules[i-1];
		}
		return this.rules[0];
	};
	
	IteratedFunctionSystem.prototype.applyRule = function(point, rule){
		var nx = rule.a*point[0] + rule.b*point[1]+rule.e;
		var ny = rule.c*point[0] + rule.d*point[1]+rule.f;
		point[0] = nx;
		point[1] = ny;
	};
