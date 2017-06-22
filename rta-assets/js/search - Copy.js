	var suggestionKW = ['Salik', 'Tag Registration', 'Toll Gates', 'Recharge', 'Nol', 'Nol Cards', 'Top Up NOL Card', 'Check NOL Card Balance', 'Driving Licence', 'Licencing Services'];

 /*
 var stopwords = ['a', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 
		'he', 'in', 'is', 'it', 'its', 'of', 'on', '.', '...', 'it',
		'that', 'the', 'to', 'was', 'were', 'will', 'with'];
 var keywds = $item[0]['snippet'].split(' ');
$.each(keywds,function(i,val){
   //check if its an empty string   
	   if($.trim(val) == "") 
		  keywds.splice(i); 
	   else if($.inArray(val.toLowerCase(),stopwords)>= 0) 
		  keywds.splice(i);  
	   else if (!val.match("^[a-zA-Z\(\)]+$"))
	   	  keywds.splice(i);   
	   else {
		  if ($.inArray(val, suggestions) < 0) 
	   	  	 suggestions.push(val);
	   }
});*/
$(document).ready(function () {
	var typingTimer;                //timer identifier
	var doneTypingInterval = 500;
	var extAllowed = ['png', 'jpg', 'gif', 'jpeg'];
	$('#searchKW,#searchServicesKW').bind("focusin", function() { $("#search_part").addClass("active"); });
	$('#searchKW,#searchServicesKW').bind("focusout", function() { $("#search_part").removeClass("active"); });
	
	$('#searchKW').keyup(function(){
		clearTimeout(typingTimer);
		typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});
	
	//on keydown, clear the countdown 
	$('#searchKW').keydown(function(){
		clearTimeout(typingTimer);
	});
	
	//user is "finished typing," do something
	function doneTyping () {
		$me = $("#searchKW");
		var $kw = $me.val();  
		
		var suggestions = new Array();  
		if ($kw.length > 0) { 
			$.ajax({
				url:'https://www.googleapis.com/customsearch/v1?key=AIzaSyC88mhpjD9l60fag4U09KDRRNdPiLVGlR4&cx=008044615233461457107:qpe19q2u5ui&alt=json&q=' + $kw,
				type:"GET", 
				async:'true',
				success:function (data) {
					//console.log(data);  
					if (data.items != null) {
						if (data.items.length > 0) { 
							$("#search_part .search-autosuggest ul").empty();
							$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:0px;");  
							$.each(data.items, function() {
								$item = $(this);   
								$.each(suggestionKW, function(i, val){
									var regex = new RegExp(val.toLowerCase(), "gi");
									if ($item[0]['snippet'].toLowerCase().match(regex) || $item[0]['title'].toLowerCase().match(regex))  {
										if ($.inArray(val, suggestions) < 0) 
											suggestions.push(val);
									}
								}); 
								
								$("#search_part .search-autosuggest ul").append('<li><a href="' + $item[0]['formattedUrl'] + '">' + $item[0]['htmlTitle'] +'</a></li>');
							});  
							//console.log(suggestions);
							$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
							
							// Other suggestions 
							$(".suggestions").empty();
							$.each(suggestions, function(i, val){ 
								$(".suggestions").append($('<li>').append($('<a>').html(val).bind("click")));
							});
							//Results
							$(".search-result").empty(); 
							$.each(data.items, function() {
								$item = $(this); 
								var img = "";
								//console.log($item[0]['pagemap']['cse_thumbnail'][0]['src']);
								try {
									img = $item[0]['pagemap']['cse_image'][0]['src'];
									var ext = img.substring(img.lastIndexOf('.') + 1); 
									if ($.inArray(ext, extAllowed) < 0) 
										img = "";
								} catch(e1) {}
								
								tags = "";
								$.each(suggestionKW, function(i, val){
									var regex = new RegExp(val.toLowerCase(), "gi");
									if ($item[0]['snippet'].toLowerCase().match(regex) || $item[0]['title'].toLowerCase().match(regex))  {
										//if ($.inArray(val, suggestions) < 0) { 
											//suggestions.push(val);
											if (tags != "")
												tags += ", ";
											tags += val;
										//}
									}
								}); 
								
								if (img != "")
									img = '<a href="' + $item[0]['link'] + '" target="_blank"><img src="' + img + '" width="100" /></a> ';
								$(".search-result").append('<li data-tag="' + tags + '">' + img + '<span><a href="' + $item[0]['link'] + '" class="tlink" target="_blank">' + $item[0]['htmlTitle'] + '</a><br>' + $item[0]['htmlSnippet'] + '</span><a href="' + $item[0]['link'] + '" target="_blank">' + $item[0]['formattedUrl'] + '</a></li>');
								 
							});  
							
						} else {
							$("#search_part .search-autosuggest ul").empty();
							$("#search_part .search-autosuggest ul").append('<li>No results found</li>');
							$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
						}
					} else {
						$("#search_part .search-autosuggest ul").empty();
						$("#search_part .search-autosuggest ul").append('<li>No results found</li>');
						$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
					}
					$('.search-result li').slice(5).hide();
				}
			});
		} else {
			$("#search_part .search-autosuggest ul").empty();
			$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:0px;");   
		}
	} 
});