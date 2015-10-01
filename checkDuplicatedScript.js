// code to trigger ajax calls
(function () {
	var proxied = window.XMLHttpRequest.prototype.send;
	window.XMLHttpRequest.prototype.send = function () {
		console.log(arguments);
		//Here is where you can add any code to process the request. 
		//If you want to pass the Ajax request object, pass the 'pointer' below
		var pointer = this
		var intervalId = window.setInterval(function () {
			if (pointer.readyState != 4) {
				return;
			}
			// pointer.responseText <-- here is the response text
			checkDuplicatedScript();
			clearInterval(intervalId);

		}, 1);//I found a delay of 1 to be sufficient, modify it as you need.
		return proxied.apply(this, [].slice.call(arguments));
	};
})();

// check duplicated registered js files
function checkDuplicatedScript() {
	var arr = Array.prototype.slice.call(document.getElementsByTagName("script"), 0);
	var sorted_arr = arr.sort();

	var results = [];
	for (var i = 0; i < arr.length - 1; i++) {
		if (sorted_arr[i + 1].src == sorted_arr[i].src) {
			results.push(sorted_arr[i]);
		}
	}

	if (results.length > 0) {
		var message = 'These files as duplicated: ';
		
		results.forEach(function(element) {
			message += element.src + ',';
		}, this);
		alert(message);
	}
	else {
		console.log('Nothing here...., but the total was: ' +  sorted_arr.length);
	}
}

// for the first time
checkDuplicatedScript();