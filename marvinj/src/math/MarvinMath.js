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

MarvinMath.euclideanDistance = function(p1, p2, p3, p4, p5, p6){
	if(p6 != null){
		return MarvinMath.euclideanDistance3D(p1, p2, p3, p4, p5, p6);
	} else{
		return MarvinMath.euclideanDistance3D(p1, p2, p3, p4);
	}
};

MarvinMath.euclideanDistance2D = function(x1, y1, x2, y2){
	var dx = (x1-x2);
	var dy = (y1-y2);
	return Math.sqrt( dx*dx + dy*dy);
};

MarvinMath.euclideanDistance3D = function(x1, y1, z1, x2, y2, z2){
	var dx = (x1-x2);
	var dy = (y1-y2);
	var dz = (z1-z2);
	return Math.sqrt( dx*dx + dy*dy + dz*dz);
};

