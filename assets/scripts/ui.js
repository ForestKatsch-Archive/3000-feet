
function m(x) {
    return x*ui.scale;
}

var ui={
    pan:{
	x:0,
	y:0
    },
    scale:15, // meters/pixel
    canvas:{
	context:null,
	size:{
	    width:640,
	    height:480
	}
    }
};

function ui_init() {
    ui.canvas.context=$("#canvas").get(0).getContext("2d");
    $(window).keydown(function(e) {
	console.log(e.which);
	if(e.which == 39)
	    player_start("move_right");
	else if(e.which == 38)
	    player_start("jump");
    });
    $(window).keyup(function(e) {
	if(e.which == 39)
	    player_stop("move_right");
	else if(e.which == 38)
	    player_stop("jump");
    });
    loaded("ui");
}

function ui_draw_ground() {
    ui.canvas.context.fillStyle="#383";
    for(var i=0;i<ground.height.length;i++) {
	var h=ground.height[i];
	ui.canvas.context.fillRect(m((h[0]*ground.size.width)+ground.size.width/2)-0.5,
				   -m(h[1]*ground.size.height),
				   m(ground.size.width)+1,
				   ui.canvas.size.height+1000);
    }
}

function ui_draw_player() {
    ui.canvas.context.fillStyle="#000";
    ui.canvas.context.fillRect(m(player.position.x-player.size.width/2)+0.5,
			       m(-(player.position.y)-player.size.height),
			       m(player.size.width)-1,
			       m(player.size.height));
}

function ui_update() {
    ui.canvas.context.clearRect(0,0,ui.canvas.size.width,ui.canvas.size.height);
    ui.canvas.context.save();
    ui.canvas.context.translate(ui.canvas.size.width/2+ui.pan.x,ui.canvas.size.height/2+ui.pan.y);
    ui_draw_ground();
    ui_draw_player();
    ui.canvas.context.restore();
}