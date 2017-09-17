// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

var stores_2 = {
		"R499": "Canton Road", 
		"R610":"New Town Plaza",
		"R673":"apm Hong Kong", 
		"R485":"Festival Walk", 
		"R409":"Causeway Bay", 
		"R428":"ifc"
	};
var types_2 = {
		"MQ6K2ZP": "細灰64", 
		"MQ6L2ZP": "細銀64", 
		"MQ6M2ZP": "細金64", 
		"MQ7F2ZP": "細灰256", 
		"MQ7G2ZP": "細銀256", 
		"MQ7H2ZP": "細金256", 
		"MQ8D2ZP": "大灰64", 
		"MQ8E2ZP": "大銀64", 
		"MQ8F2ZP": "大金64", 
		"MQ8G2ZP": "大灰256", 
		"MQ8H2ZP": "大銀256",
		"MQ8J2ZP": "大金256", 
		"MQA62ZP": "X銀64", 
		"MQA52ZP": "X灰64", 
		"MQA92ZP": "X銀256", 
		"MQA82ZP": "X灰256"
	};


function get(){
	var stores = ["R499", "R610", "R673", "R485", "R409", "R428"];

	var types = ["MQ6K2ZP", "MQ6L2ZP", "MQ6M2ZP", "MQ7F2ZP", "MQ7G2ZP", "MQ7H2ZP", "MQ8D2ZP", "MQ8E2ZP", "MQ8F2ZP", "MQ8G2ZP", "MQ8H2ZP", "MQ8J2ZP"];
	var x = ["MQA62ZP", "MQA52ZP", "MQA92ZP", "MQA82ZP"];
	// var types = ["MQ6K2ZP", "MQ6L2ZP", "MQ6M2ZP", "MQ7F2ZP", "MQ7G2ZP", "MQ7H2ZP", "MQ8D2ZP", "MQ8E2ZP", "MQ8F2ZP", "MQ8G2ZP", "MQ8H2ZP", "MQ8J2ZP", "MQA62ZP", "MQA52ZP", "MQA92ZP", "MQA82ZP"];


	$.ajax({ 
		type: 'GET',
		url: 'http://localhost:8000/ajaxcall',
				// url: 'https://reserve-prime.apple.com/HK/en_HK/reserve/iPhone/availability.json',
				dataType: 'json'
			})
	.done(function(data) {
		$('#getResponse').html(JSON.stringify(data, "", 2));
		// console.log('GET response: ', JSON.stringify(data, "", 2));

		var d = new Date();
		var apple_timestamp = new Date(data.updated)
		console.log(d.toLocaleTimeString(), ' - ', apple_timestamp , '(', data.updated, ')' );
		// console.log( (data.stores["R428"][ "MQA62ZP/A"]) ? "1" : "2" ) ;


		$('#timestamp').html(d.toLocaleTimeString());
		$('#apple_timestamp').html(apple_timestamp);
		$('#isToday').html(data.isToday.toString());
		$('#launchDate').html(data.launchDate.zh_HK);
		$('#launchDate').html(data.launchDate.zh_HK);

		$.each(stores, function (s_key, s_value){

			$.each(types, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_unlocked";
				$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
				$('#' + id).removeClass();
				$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
				if(data.stores[s_value][ t_value + '/A'].availability.unlocked) {
					notifyMe(s_value, t_value, 'Unlocked');
				}
			});

			$.each(x, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_unlocked";
				if(data.stores[s_value][ t_value + '/A']) {
					$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
					$('#' + id).removeClass();
					$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
					if(data.stores[s_value][ t_value + '/A'].availability.unlocked) {
						notifyMe(s_value, t_value, 'Unlocked');
					}
				} else {
					$('#' + id).html("null");
					$('#' + id).removeClass();
					$('#' + id).addClass("null");
				}
			});
		});

		$.each(stores, function (s_key, s_value){
			$.each(types, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_contract";
				$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
				$('#' + id).removeClass();
				$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
				if(data.stores[s_value][ t_value + '/A'].availability.unlocked) {
					notifyMe(s_value, t_value, 'Contract');
				}
			});

			$.each(x, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_contract";
				if(data.stores[s_value][ t_value + '/A']) {
					$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
					$('#' + id).removeClass();
					$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
					if(data.stores[s_value][ t_value + '/A'].availability.unlocked) {
						notifyMe(s_value, t_value, 'Contract');
					}
				} else {
					$('#' + id).html("null");
					$('#' + id).removeClass();
					$('#' + id).addClass("null");
				}
			});
		});
	})
	.fail(function(jqXHR, textStatus, err){
		console.log('AJAX error response: ', textStatus, err);
	});
}

	
function notifyMe(location, type, lock) {
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	}

	if (Notification.permission !== "granted")
		Notification.requestPermission();
	else {
		var notification = new Notification('有貨', {
			// icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
			body: stores_2[location] + ' - ' + types_2[type] + ' - ' + lock
		});

		// notification.onclick = function () {
		// 	window.open("http://stackoverflow.com/a/13328397/1269037");      
		// };
	}
}

setInterval(get, 1000);