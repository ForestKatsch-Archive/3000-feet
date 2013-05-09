
var ground={
    height:[],
    extra:10,
    extent:{
	left:0,
	right:0
    },
    end:{
	left:0,
	right:0,
    },
    size:{
	width:3,
	height:1
    }
};

function ground_init() {
    ground_generate_range(-((ui.canvas.size.width/2+ground.extra)/ui.scale),((ui.canvas.size.width/2+ground.extra)/ui.scale));
    loaded("ground");
}

function ground_generate_range(start,end) {
    for(var i=start;i<end+1;i++) {
	ground_generate(i);
    }
}

var z=0;

function ground_height(location) {
    location*=ground.size.width;
    for(var i=0;i<ground.height.length;i++) {
	var h=ground.height[i];
	if((location > h[0]-ground.size.width/2) && (location < h[0]+ground.size.width/2)) {
	    return h[1];
	}
    }
    return false;
}

function ground_generate(location) {
    //    var location=ground.extent.left-1;
    var height=Math.floor(Math.random()*3)-1;
    if(ground.extent.left == location) {
	height+=ground.end.left;
    } else if(ground.extent.right == location-1) {
	height+=ground.end.right;
    }
    ground.height.push([location,height]);
    ground.extent.left=Math.min(ground.extent.left,location);
    ground.extent.right=Math.max(ground.extent.right,location);
    if(ground.extent.left == location) {
	ground.end.left=height;
    } else if(ground.extent.right == location) {
	ground.end.right=height;
    }
}

function ground_generate_at(side) {
    if(side == "left")
	ground_generate(ground.extent.left-1);
    if(side == "right")
	ground_generate(ground.extent.right+1);
}

function ground_update() {
    if((ui.pan.x-ui.canvas.size.width/2) < m((ground.extent.left+ground.extra)*ground.size.width))
	ground_generate_at("left");
    if((ui.pan.x+ui.canvas.size.width/2) > m((ground.extent.right-ground.extra)*ground.size.width))
	ground_generate_at("right");
}