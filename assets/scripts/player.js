
var player={
    actions:{
	"move_right":false,
	"jump":false
    },
    last_time:new Date().getTime(),
    position:{
	x:0,
	y:0,
	yd:0
    },
    speed:{
	move:2,
	jump:15,
	gravity:-1
    },
    size:{
	width:1,
	height:2
    }
};

function player_init() {
    loaded("player");
}

function player_start(a) {
    player.actions[a]=true;
}

function player_stop(a) {
    player.actions[a]=false;
}

function player_move_right() {
    var delta=(new Date().getTime()-player.last_time)/1000;
    var move=player.speed.move*delta;
    if(ground_height(player.position.x+move) > player_ground_height()) {

    } else {
	player.position.x+=move;
    }
}

function player_ground_height() {
    return ground_height(player.position.x);
}

function player_jump() {
    if(player.position.y > player_ground_height())
	return;
    var delta=(new Date().getTime()-player.last_time)/1000;
    player.position.yd=player.speed.jump*delta;
}

function player_update() {
    var delta=(new Date().getTime()-player.last_time)/1000;
    if(player.actions.jump == true) {
	player_jump();
    } else if(player.actions.move_right == true) {
	player_move_right();
    }
    player.position.yd+=player.speed.gravity*delta;
    player.position.y+=player.position.yd;
    player.position.y=Math.max(player_ground_height(),player.position.y);
    player.last_time=new Date().getTime();
}