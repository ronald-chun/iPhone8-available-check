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
			});

			$.each(x, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_unlocked";
				if(data.stores[s_value][ t_value + '/A']) {
					$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
					$('#' + id).removeClass();
					$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.unlocked.toString());
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
			});

			$.each(x, function (t_key, t_value){
				var id = s_value + '_' + t_value + "_contract";
				if(data.stores[s_value][ t_value + '/A']) {
					$('#' + id).html(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
					$('#' + id).removeClass();
					$('#' + id).addClass(data.stores[s_value][ t_value + '/A'].availability.contract.toString());
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

setInterval(get, 1000);