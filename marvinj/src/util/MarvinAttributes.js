	function MarvinAttributes(){
		this.hashAttributes = new Object();
	}

	MarvinAttributes.prototype.set = function(name, value){
		this.hashAttributes[name] = value;
	};
	
	MarvinAttributes.prototype.get = function(name, defaultValue){
		var ret = this.hashAttributes[name];
		
		if(ret != null){
			return ret;
		}
		return defaultValue;
	};
	
	MarvinAttributes.prototype.clone = function(){
		var attrs = new MarvinAttributes();
		
		for(var key in this.hashAttributes){
			attrs.set(key, this.hashAttributes[key]);
		}
		return attrs;
	};