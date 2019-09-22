window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	var mirror = Array(canvas.width);	// Counters for points
	for (var i = mirror.length - 1; i >= 0; i--) {
		mirror[i] = Array(canvas.height).fill(0)
	}
	canvas.mirror = mirror;
}

// Drawing all the points using an existing generator
function draw_points(init=0, last=0, drawer_g=function*(){return [0,0];}, canvas, context) {
	var image_data = context.createImageData(1,1); 
	var d  = image_data.data;

	gener = drawer_g(init, last); // Get the generator needed
	for (let point of gener) {
		[x,y] = point;
		[x,y] = [x%canvas.width,y%canvas.height]	// Don't draw outside of canvas
		d[0] = d[1] = d[2] = 0; // Color
		d[3] = canvas.mirror[x][y]*32; // Opacity pixel

		context.putImageData(image_data, x, y); // Draw the pixel
		canvas.mirror[x][y] = canvas.mirror[x][y] + 1;	// Counter for pixelssd
	}
}
