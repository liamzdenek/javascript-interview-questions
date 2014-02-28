
// #2

// given the text in the variable "corpus", write the following:
var corpus = "The ship drew on and had safely passed the strait, which some volcanic shock has made between the Calasareigne and Jaros islands; had doubled Pomegue, and approached the harbor under topsails, jib, and spanker, but so slowly and sedately that the idlers, with that instinct which is the forerunner of evil, asked one another what misfortune could have happened on board. However, those experienced in navigation saw plainly that if any accident had occurred, it was not to the vessel herself, for she bore down with all the evidence of being skilfully handled, the anchor a-cockbill, the jib-boom guys already eased off, and standing by the side of the pilot, who was steering the Pharaon towards the narrow entrance of the inner port, was a young man, who, with activity and vigilant eye, watched every motion of the ship, and repeated each direction of the pilot.";

// 1. calculate word frequency in the input text collection. Separators include [ ,-.?!]
// 2. show word frequency in descending order and ascending order, based on a radio button in index.html
// 3. show words in alphabetical order and reverse alphabetical order, with word frequency, based on a radio button in index.html
// 4. ensure that browser does not block when calculating these frequencies

function word_frequency(str) {
	str = str.split(/[ ,-\.?!;]/); // i presume you don't want me to include square braces // i also added semicolon since it looked like a separator
	words = {};
	for(var i = 0; i < str.length; i++) {
		w = str[i]
		if(w != "")
			!words[w] ? words[w] = 1 : words[w]++;
	}
	aggregate = [];
	for(i in words) {
		if(words.hasOwnProperty(i)) {
			j = words[i];
			found = false;
			for(k in aggregate) {
				if(aggregate[k].word_len == j) {
					aggregate[k].words.push(i)
					found = true;
					break;	
				}
			}
			if(!found) {
				for(var l = 0; l < aggregate.length+1; l++) {
					if(aggregate[l] == null || aggregate[l].word_len > j) {
						aggregate.splice(l, 0, {word_len: j, words: [i]});
						break;
					}
				}
			}
		}
	}
	return aggregate;
}

onmessage = function(e) {
	postMessage(word_frequency(corpus));
}
