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

MarvinJSUtils.createMatrix4D = function(rows, cols, depth, another, value){
	var arr = new Array(rows);
	for(var i=0; i<arr.length; i++){
		arr[i] = new Array(cols);
		for(var j=0; j<arr[i].length; j++){
			arr[i][j] = new Array(depth);
			for(var w=0; w<arr[i][j].length; w++){
				arr[i][j][w] = new Array(another);
				arr[i][j][w].fill(value);
			}
		}
	}
	return arr;
};