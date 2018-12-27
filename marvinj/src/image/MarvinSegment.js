
	function MarvinSegment(x1, y1, x2, y2){
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		
		if(x1 != -1 && y1 != -1 && x2 != -1 && y2 != -1){
			this.width = (x2-x1)+1;
			this.height = (y2-y1)+1;
			this.area = this.width*this.height;
		}
	}
	
	MarvinSegment.segmentMinDistance = function(segments, minDistance){
		var s1,s2;
		for(var i=0; i<segments.size()-1; i++){
			for(var j=i+1; j<segments.size(); j++){
				s1 = segments[i];
				s2 = segments[j];
				
				if(MarvinMath.euclidianDistance( (s1.x1+s1.x2)/2, (s1.y1+s1.y2)/2, (s2.x1+s2.x2)/2, (s2.y1+s2.y2)/2 ) < minDistance){
					segments.splice(j, 1);
					j--;
				}
			}
		}
	}

