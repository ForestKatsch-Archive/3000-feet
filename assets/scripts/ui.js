
function m(x) {
    return x*ui.scale;
}

var ui={
    pan:{
	x:0,
	y:0
    },
    scale:10, // meters/pixel
    canvas:{
	context:null,
	size:{
	    height:640,
	    width:480
	}
    }
};

function ui_init() {
    loaded("ui");
}

function ui_draw_ground() {

}

function ui_update() {
    ui.canvas.context.save();
    ui.canvas.context.translate(ui.pan.x,ui.pan.y);
    ui_draw_ground();
    ui.canvas.context.restore();
}