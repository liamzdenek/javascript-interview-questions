workerResult = null;
worker = new Worker("worker.js");

worker.addEventListener("message", function(e) {
	workerResult = e.data;
	container = document.getElementById("workerResult");
	
	data = document.createElement("div");
	button = document.createElement("button");

	button.innerHTML = "Reverse";

	button.onclick = function() {
		workerResult = workerResult.reverse();
		repopulateWorkerResults();
	}

	repopulateWorkerResults();

	container.appendChild(button);
	container.appendChild(data);
});

function repopulateWorkerResults() {
	data.innerHTML = "";
	for(i in workerResult) {
		data.innerHTML += workerResult[i].word_len+" = "+workerResult[i].words+"<br/>";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	output = document.getElementById("content");
	
	questionOne(attrStructure);
	output.innerHTML += "<h3>#1</h3>";
	output.innerHTML += "<pre>"+JSON.stringify(attrStructure)+"</pre>";

	output.innerHTML += "<h3>#2</h3>";
	output.innerHTML += '<div id="workerResult"></div>';

	worker.postMessage(); // begin the work
});


// #1

var attrStructure = {"tag":"(0008,0018)","value":"1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980","attr":[{"tag":"(0008,002A)","value":"20130318124132"},{"tag":"(0008,0020)","value":"20130318"},{"tag":"(0008,0030)","value":"123650"},{"tag":"(0008,0018)","value":"1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980"},{"tag":"(0008,0060)","value":"CR"},{"tag":"(0008,103E)","value":"SUNRISE VIEW"},{"tag":"(0018,0015)","value":"KNEE"},{"tag":"(0018,1164)","value":"0.1\\0.1"},{"tag":"(0018,5101)","value":"AP"},{"tag":"(0020,0013)","value":"2"},{"tag":"(0020,0020)","value":"L\\F"},{"tag":"(0028,0030)","value":"0.10000000149011\\0.10000000149011"},{"tag":"(0028,1052)","value":"0"},{"tag":"(0028,1053)","value":"1"},{"tag":"(0028,1054)","value":"LOG_E REL"},{"tag":"(0028,0101)","value":"12"},{"tag":"(0028,0010)","value":"2328"},{"tag":"(0028,0011)","value":"2928"},{"tag":"(0008,1030)","value":"Femur Knee Leg"},{"tag":"(0010,0010)","value":"BEAN^ELENA"},{"tag":"(0010,0020)","value":"690100"},{"tag":"(0010,0030)","value":"19400826"},{"tag":"(0010,0040)","value":"F"},{"tag":"(0010,4000)","value":"L KNEE"}]};

// will not force a reallocation, returns null always. no error handling
function questionOne(o) {
	o[o.tag] = o.value;
	delete(o.tag);
	delete(o.value);
	new_pairs = {};
	for(var i = 0; i < o.attr.length; i++) {
		new_pairs[o.attr[i].tag] = o.attr[i].value;
	}
	o.attr = new_pairs;
}
// #3
//
// the key here is to allow for async, non-blocking processing while executing the callback only once, only once ALL async calls have completed.
// 
// Execute all of the following using JSONP with Jquery (or whatever you wish)

// 1. do a search on google for "twitter patients" (https://www.google.com/search?q=twitter+patients&safe=off)
// 2. for the first 10 of these, retrieve the twitter profile bio from their public profile page (twitter.com/{{handle}})
// 	a. the element to get is ".bio.profile-field"
// 3. as you get each of these, add them to the page, into a table with the following structure:
// 	<th>twitter handle</th>
// 	<th>twitter link</th>
// 	<th>twitter bio</th>
// 4. after all of these are retrieved and displayed, call a function into which you pass in the following data structure (JSON):
// 	a. make sure that the call contains data for all 10 twitter calls.
// 	[{handle: 'twitter handle', link: 'twitter link', bio: 'twitter bio'}, ...]
// 5. ensure that the last call is only called once, and only once all info has been both retrieved and output to the page.
