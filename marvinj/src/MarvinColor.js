
function MarvinColor(red, green, blue){
	this.red = red;
	this.green = green;
	this.blue = blue;
	return this;
}

MarvinColor.prototype.setId = function(id){
	this.id = id;
};

MarvinColor.prototype.getId = function(){
	return this.id;
};

MarvinColor.prototype.setName = function(name){
	this.name = name;
};

MarvinColor.prototype.getName = function(){
	return this.name;
};