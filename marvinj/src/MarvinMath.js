var MarvinMath = new Object();

MarvinMath.getTrueMatrix = function(rows, cols){
	var ret = MarvinJSUtils.createMatrix2D(rows, cols);
	
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			ret[i][j]  = true;
		}
	}
	return ret;
};

MarvinMath.scaleMatrix = function(matrix, scale){
	var ret = MarvinJSUtils.createMatrix2D(matrix.length, matrix.length);
	
	for(var i=0; i<matrix.length; i++){
		for(var j=0; j<matrix.length; j++){
			ret[i][j] = matrix[i][j] * scale;
		}
	}
	return ret;
};

MarvinMath.euclideanDistance = function(x1, y1, z1, x2, y2, z2){
	var dx = (x1-x2);
	var dy = (y1-y2);
	var dz = (z1-z2);
	return Math.sqrt( dx*dx + dy*dy + dz*dz);
};

