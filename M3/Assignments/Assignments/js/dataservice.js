function DataService() {
	//assign functions to this function
	 var self = this;

// getting all items in Data Service
	self.getItems = function(callback, errorCallback) {
	console.log(1, 'received all items');
	$.ajax({
		url: 'http://localhost:8080/items',
		method: 'GET',
		headers: {
		'accept' : 'application/json'
},
		success: callback,
		error: errorCallback
});

}

//vend Item

self.vendItem = function(amount, id, callback, errorCallback){

$.ajax({
		url: "http://localhost:8080/money/"+amount+"/item/"+id,
		method: 'GET',
		headers: {
		'accept' : 'application/json'
},
	   success: callback,
	   error: errorCallback
});

}

}

