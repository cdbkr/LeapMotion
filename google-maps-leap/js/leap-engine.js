var controller = new Leap.Controller({enableGestures:true});
var PALM_MAP_TYPE_THRESHOLD = 150;
var PALM_MAP_MOVE_THRESHOLD = 100;
var data = {};

controller.on('connect', function() {
	console.log("Successfully connected.");
});

controller.on('deviceConnected', function() {
	console.log("A Leap device has been connected.");
});

controller.on('deviceDisconnected', function() {
	console.log("A Leap device has been disconnected.");
});

controller.on('frame', function(frame){
	data = frame;
	if(data && data.hands.length > 0){
		if(data.hands[0].palmPosition[1] < PALM_MAP_MOVE_THRESHOLD){
			map.panBy(data.hands[0].palmPosition[0]/10,data.hands[0].palmPosition[2]/10);
		}else if(data.hands[0].palmPosition[1] > PALM_MAP_TYPE_THRESHOLD){
			checkFingers(data);
		}
	}
});

function checkFingers(frame){
	switch(frame.pointables.length){
		case 1:
		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
		break;
		case 2:
		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
		break;
		default:
		break;
	}
}

controller.connect();