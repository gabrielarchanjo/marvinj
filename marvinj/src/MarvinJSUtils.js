var MarvinJSUtils = new Object();

MarvinJSUtils.createMatrix2D = function(rows, cols, value){
	var arr = new Array(rows);
	for(var i=0; i<arr.length; i++){
		arr[i] = new Array(cols);
		arr[i].fill(value)
	}
	return arr;
};

MarvinJSUtils.createMatrix3D = function(rows, cols, depth, value){
	var arr = new Array(rows);
	for(var i=0; i<arr.length; i++){
		arr[i] = new Array(cols);
		for(var j=0; j<arr[i].length; j++){
			arr[i][j] = new Array(depth);
			arr[i][j].fill(value)
		}
	}
	return arr;
};