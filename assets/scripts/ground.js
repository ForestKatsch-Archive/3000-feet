
var ground={
    height:[],
    extra:10,
    extent:{
	left:0,
	right:0
    },
    width:2
};

function ground_init() {
    loaded("ground");
}

function ground_generate(location) {
    console.log("Creating ground at "+location);
    ground.height.push([location,Math.floor(Math.random()*4)]);
    ground.extent.left=Math.min(ground.extent.left,location);
    ground.extent.right=Math.max(ground.extent.right,location);
}

function ground_generate_at(side) {
    if(side == "left")
	ground_generate(ground.extent.left-1);
    if(side == "right")
	ground_generate(ground.extent.right+1);
}

function ground_update() {
    if((ui.pan.x-ui.canvas.size.width/2) < m((ground.extent.left+ground.extra)*ground.width))
	ground_generate_at("left");
    if((ui.pan.x+ui.canvas.size.width/2) > m((ground.extent.right-ground.extra)*ground.width))
	ground_generate_at("right");
}