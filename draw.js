window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
}

// Drawing all the points using an existing generator
function draw_points(init=0, last=0, drawer_g=function*(){return [0,0];}, canvas, context) {
	canvas_data = context.getImageData(0, 0, canvas.width, canvas.height);

	gener = drawer_g(init, last); // Get the generator needed
	for (let point of gener) {
		[x,y] = point;
		[x,y] = [x%canvas.width,y%canvas.width]	// Don't draw outside of canvas
		context.beginPath();
		context.arc(x, y, 1, 0, Math.PI * 2, true);
		context.stroke(); //Draw the thing
	}
}
