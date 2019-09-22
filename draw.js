window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	var mirror = Array(canvas.width).fill(Array(canvas.height).fill(0));	// Counters for points
}

// Drawing all the points using an existing generator
function draw_points(init=0, last=0, drawer_g=function*(){return [0,0];}, canvas, context) {
	var image_data = context.createImageData(1,1); 
	var d  = image_data.data;
	d[0] = 0;
	d[1] = 0;
	d[2] = 0;
	d[3] = 255; // Create and color a pixel
	gener = drawer_g(init, last); // Get the generator needed
	for (let point of gener) {
		[x,y] = point;
		[x,y] = [x%canvas.width,y%canvas.height]	// Don't draw outside of canvas
		context.putImageData(image_data, x, y); // Draw the pixel
	}
}
