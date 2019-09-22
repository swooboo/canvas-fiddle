window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
}

// Drawing all the points using an existing generator
function draw_points(init=0, drawer_g=function*(){return [0,0];}, canvas, context) {
	gener = drawer_g(init);
	while (!gener.done) {
		var [x,y] = gener.next().value;
    	var index = (x + y * canvas.canvasWidth) * 4; // We'll just draw a point
    	canvasData.data[index + 0] = canvasData.data[index + 1] = canvasData.data[index + 2] = 0; // Black point, RGB=0
    	canvasData.data[index + 4] = 255; // Opaque
	}
}
