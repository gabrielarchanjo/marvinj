var MarvinAbstractImagePlugin = new Object();

MarvinAbstractImagePlugin.super = function(ref){
	ref.attributes = {};
	ref["setAttribute"] = MarvinAbstractImagePlugin.setAttribute;
	ref["getAttribute"] = MarvinAbstractImagePlugin.getAttribute;
};

MarvinAbstractImagePlugin.setAttribute = function(label, value){
	this.attributes[label] = value;
};

MarvinAbstractImagePlugin.getAttribute = function(label, value){
	return this.attributes[label];
};