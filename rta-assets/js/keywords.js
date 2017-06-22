var suggestionKW = [];
//var suggestionKW = ['nol recharge'];
var suggestionKW2 = Array()
$(document).ready(function () {
	$.each(suggestionKW, function(i, val){ 
		if (val != "" && val != null && val.length > 2) {
			if($.inArray(val.toLowerCase(), suggestionKW2) < 0) 
			  suggestionKW2.push(val);
		}
	});
	//console.log(suggestionKW);
});