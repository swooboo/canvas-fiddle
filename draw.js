window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	var mirror = Array(canvas.width);	// Counters for points
	for (var i = mirror.length - 1; i >= 0; i--) {
		mirror[i] = Array(canvas.height).fill(0)
	}
	canvas.mirror = mirror;

	// EXAMPLE
	function* g(init,last){
		for (var i = init; i <last; i++) {
			yield([i,Math.floor(Math.sin(i/47)*97)]);
		}
	}
	draw_points(0,10000,g, canvas, context);
	draw_points(10000,20000,g, canvas, context);
	draw_points(20000,30000,g, canvas, context);
	// END EXAMPLE
}

// Drawing all the points using an existing generator
function draw_points(init=0, last=0, drawer_g=function*(){return [0,0];}, canvas, context) {
	var image_data = context.createImageData(1,1); 
	var d  = image_data.data;

	gener = drawer_g(init, last); // Get the generator needed
	for (let point of gener) {
		[x,y] = point;
		[x,y] = [x%canvas.width,y%canvas.height]	// Don't draw outside of canvas
		d[0] = canvas.mirror[x][y]*16; // Some reds to indicate a lot of points
		d[1] = d[2] = 0+canvas.mirror[x][y]*2; // Color
		d[3] = 255; // Opacity pixel
		context.putImageData(image_data, x, y); // Draw the pixel
		canvas.mirror[x][y] = canvas.mirror[x][y] + 1;	// Counter for pixelssd
	}
}
