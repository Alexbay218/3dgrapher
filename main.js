var inputSurface = document.getElementById("inputSur");
var inputEquation = document.getElementById("inputEqn");
var clearButton = document.getElementById("clear");
var param;
var tracenum = -1;
inputSurface.onclick = function() {
	var val = document.getElementById("inputFunc").value;
	param = JSON.parse("{\n" + document.getElementById("params").value + "}");
	var f = Function("x", "y", "return " + val + ";");
	var dataX = [];
	var dataY = [];
	var dataZ = [];
	for(var x = param.minX;x <= param.maxX;x+=param.deltaX) {
		for(var y = param.minY;y <= param.maxY;y+=param.deltaY) {
			if(Number.isFinite(f(x,y)) && f(x,y) < param.maxZ && f(x,y) > param.minZ) {
				dataX.push(x);
				dataY.push(y);
				dataZ.push(f(x,y));
			}
		}
	}
	var disp = document.getElementById("display");
	var trace = {
		x: dataX,
		y: dataY,
		z: dataZ,
		mode: 'markers',
		marker: {
			size: 1,
			opacity: 1
		},
		type: 'scatter3d'
	};
	Plotly.plot(disp, [trace], {width: 700, height: 700, hovermode: false});
	tracenum++;
}
inputEquation.onclick = function() {
	var val = document.getElementById("inputFunc").value;
	param = JSON.parse("{\n" + document.getElementById("params").value + "}");
	var f = Function("x", "y", "z", "return " + val + ";");
	var dataX = [];
	var dataY = [];
	var dataZ = [];
	for(var x = param.minX;x <= param.maxX;x+=param.deltaX) {
		for(var y = param.minY;y <= param.maxY;y+=param.deltaY) {
			for(var z = param.minZ;z <= param.maxZ;z+=param.deltaZ) {
				if(Number.isFinite(f(x,y,z)) && Math.abs(f(x,y,z)) < param.thresh) {
					dataX.push(x);
					dataY.push(y);
					dataZ.push(z);
				}
			}
		}
	}
	var disp = document.getElementById("display");
	var trace = {
		x: dataX,
		y: dataY,
		z: dataZ,
		mode: 'markers',
		marker: {
			size: 1,
			opacity: 1
		},
		type: 'scatter3d'
	};
	Plotly.plot(disp, [trace], {width: 700, height: 700, hovermode: false});
	tracenum++;
}
clearButton.onclick = function() {
	if(tracenum >= 0) {
		Plotly.deleteTraces("display", tracenum);
		tracenum--;
	}
}