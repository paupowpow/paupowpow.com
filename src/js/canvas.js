var canvas = document.getElementsByClassName('imagecanvas')[0];
canvas.width = 0;
canvas.height = 0;

var kidpixImage = new Image();

var imageID = canvas.id;

switch(imageID) {
	case 'imagecanvas1':
		kidpixImage.src = '/img/kidpix00375.png';
		break;
	case 'imagecanvas2':
		kidpixImage.src = '/img/kidpix00384.png';
		break;
	case 'imagecanvas3':
		kidpixImage.src = '/img/kidpix00404.png';
		break;
	case 'imagecanvas4':
		kidpixImage.src = '/img/kidpix00416.png';
		break;
	case 'default':
		kidpixImage.src = '/img/kidpix00375.png';
		break;
}

window.onload = function(){ // image has loaded

	var bodyWidth = document.body.clientWidth;
	var imageRatio = kidpixImage.width/kidpixImage.height;
	var scaleFactor = bodyWidth/kidpixImage.width;

	canvas.width = bodyWidth;
	canvas.height = bodyWidth/imageRatio;

	var context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	trackTransforms(context);

	function redraw(){
      var p1 = context.transformedPoint(0,0);
      var p2 = context.transformedPoint(canvas.width,canvas.height);
      context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

      context.save();
      context.setTransform(1,0,0,1,0,0);
      context.clearRect(0,0,canvas.width,canvas.height);
      context.restore();

      context.drawImage(kidpixImage, 0, 0, kidpixImage.width, kidpixImage.height, // source rectangle
                   			 0, 0, canvas.width, canvas.height); // destination rectangle

    }

    redraw();

    var lastX=canvas.width/2, lastY=canvas.height/2;

    var dragStart,dragged;

    canvas.addEventListener('mousedown',function(evt){
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragStart = context.transformedPoint(lastX,lastY);
		dragged = false;
	},false);

	canvas.addEventListener('mousemove',function(evt){
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragged = true;
		if (dragStart){
			var pt = context.transformedPoint(lastX,lastY);
			context.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			redraw();
		}
	},false);

	canvas.addEventListener('mouseup',function(evt){
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
	},false);

	var scaleFactor = 1.1;

	var zoom = function(clicks) {
		var pt = context.transformedPoint(lastX,lastY);
		context.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
		context.scale(factor,factor);
		context.translate(-pt.x,-pt.y);
		redraw();
	}

	var handleScroll = function(e) {
		var delta = e.deltaY ? e.deltaY/40 : e.detail ? -e.detail : 0;
		if (delta) zoom(delta);
		return e.preventDefault() && false;
	}

	canvas.addEventListener('wheel', handleScroll, false);

}


function trackTransforms(context){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	context.getTransform = function(){ return xform; };

	var savedTransforms = [];
	var save = context.save;
	context.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(context);
	};

	var restore = context.restore;
	context.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(context);
	};

	var scale = context.scale;
	context.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(context,sx,sy);
	};

	var rotate = context.rotate;
	context.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(context,radians);
	};

	var translate = context.translate;
	context.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(context,dx,dy);
	};

	var transform = context.transform;
	context.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(context,a,b,c,d,e,f);
	};

	var setTransform = context.setTransform;
	context.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(context,a,b,c,d,e,f);
	};

	var pt  = svg.createSVGPoint();
	context.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
}