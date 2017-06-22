function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function () { 

if(window.location.href.indexOf("true") > -1) {
		$("#leftnav_part #show_login").css("display", "none");
	  $("#leftnav_part #loggedin").html('<a id="show_manage_account" href="/wpsv5/wps/myportal/rta/ae/home/my-rta-account"><span>Manage<br>Account</span></a><a id="show_logout" href="/wpsv5/wps/myportal/rta/ae/home/saml/samllogout"><span>Log out</span></a>');
}

	var kw = getUrlVars()["kw"];
	if (kw != "") {
		if (typeof kw != 'undefined') {
			$("#searchKW").val(decodeURIComponent(kw));
			doneTyping();
		} 
	}
		$("#search_part .search-autosuggest ul").empty();
	$("#search_part").on("mouseleave", function() {
		$(".search-autosuggest").hide();	
	}).on("mouseover", function() {$(".search-autosuggest").show();});
	if(typeof permore == 'undefined')
		permore = 5;
	$('.more-visible').slice(permore).hide();
	var $more = $('.load-more-search');
	
	$(window).scroll(function() {
		if ($('.load-more-search').length > 0) {
			if ($(window).scrollTop() + $(window).height() >= $('.load-more-search').offset().top+100) {
				if ($('.load-more-search').attr('data-load') == "true") {
					if (!$('.load-more-search').attr('loaded')) {
						//not in ajax.success due to multiple sroll events
						$('.load-more-search').attr('loaded', true);
						$more.trigger("click"); 
					}
				}
			}
		}
	});
	$more.click(function(){
		$me = $(this); 
		permore = $me.attr("data-id");
		$('.more-visible:hidden').slice(0, permore).fadeToggle(500); 
		if($('.more-visible:hidden').length == 0)
			$more.hide();
		$('.load-more-search').attr('loaded', ""); 
	});
	
	/*$("#searchKW").keypress(function(event) {
	   if (event.which == 13) {
		  location.href ="search.html?kw=" + $(this).val();
		  event.preventDefault();
	   }
	});*/
	
	/*$("#searchKW").keypress(function(event) {			
			
	   if (event.which == 13) {
		  //location.href ="search.html?kw=" + $(this).val();
		  if ($.cookie('locale_new') == 'ar') {
		  	location.href ="/wpsv5/links/Design/asearch.html?kw=" + encodeURI($(this).val());
		  } else {
		  	location.href ="/wpsv5/links/Design/esearch.html?kw=" + encodeURI($(this).val());
		  }
		  event.preventDefault();
	   }
	});*/
	
	$("#searchKW").keypress(function(event) {		   
		if (event.which == 13) {		   
			location.href ="/wps/portal/rta/ae/home/search?kw=" + encodeURI($(this).val());		  
			event.preventDefault();
	   }
	});
	
	$(".sugclose").click( function() {
		$("#search_part .search-autosuggest").hide(); 
		$(this).hide(); 
	});
	
	var typingTimer;                //timer identifier
	var doneTypingInterval = 500;
	var extAllowed = ['png', 'jpg', 'gif', 'jpeg'];
	$('#searchKW, #searchServicesKW').bind("focusin", function() { $("#search_part").addClass("active"); });
	$('#searchKW, #searchServicesKW').bind("focusout", function() { $("#search_part").removeClass("active"); });
	
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
		var host = window.location.host;
		var protocol = window.location.protocol;
		host = protocol + '//' + host;
		
		$("#searchResultsLoader").show();
		$("#searchResultsNone").hide();
		$me = $("#searchKW");
		$next = $(".load-more-search").attr("data-next");
		var $kw = $me.val();  
		//var vis = permore;
		var suggestions = new Array();  
		if ($kw.length > 0) { 
		    $count = 0;
			$.ajax({
				url:'https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=016717179209839831092:_jnvsjx-bgs&q=' + encodeURIComponent($kw),
				type:"GET",
				async:'true',
				success:function (data) { 
					$.ajax({url: host + '/wps/PA_IDOS/getServicesNamesServlet?methodName=getServicesNamesWithIDs&lang=ar', type:'GET', async:true, crossDomain: true, success: function(jData) {
						  var regex = /\\/g; 
						  jsonData = JSON.parse(jData);
						  for(var i in jsonData) {   
							  var regex = new RegExp($kw.trim(), "gi"); 
							  
							  var value = jsonData[i].value;
							  var label = jsonData[i].label; 
							  var regex = new RegExp($kw.trim().toLowerCase(), "gi"); 
							  if (label.toLowerCase().match(regex)){
								  if (value.trim() != "") {
									 //console.log(label);  
									 $("#search_part .search-autosuggest ul").prepend('<li><a href="/wps/portal/rta/ae/home/rta-services/service-details?serviceId=' + value.trim() + '">' + label.trim() + '</a></li>');
								  }
							  }
						  } 
					}});				
					if (data.items != null) {
						if (data.items.length > 0) { 
							$("#search_part .search-autosuggest ul").empty();
							$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:0px;"); 
							$.each(data.items, function() {
								$item = $(this);   
								$.each(suggestionKW2, function(i, val){
									var regex = new RegExp(val.toLowerCase(), "gi"); 
									if ($kw.length <= 2) {
										if ($item[0]['title'].toLowerCase().match(regex))  {
											if ($.inArray(val, suggestions) < 0) 
												suggestions.push(val);
										}
									} else {
										if ($item[0]['snippet'].toLowerCase().match(regex) || $item[0]['title'].toLowerCase().match(regex))  {
											if ($.inArray(val, suggestions) < 0) 
												suggestions.push(val);
										}
									}
								}); 
								if ($kw.length <= 2) {
									var regex = new RegExp($kw.toLowerCase(), "gi");
									if ( $item[0]['title'].toLowerCase().match(regex)) {
										$("#search_part .search-autosuggest ul").append('<li><a href="' + $item[0]['link'] + '">' + $item[0]['title'] +'</a></li>');
										$count ++;
									}
								}
								else {
									$("#search_part .search-autosuggest ul").append('<li><a href="' + $item[0]['link'] + '">' + $item[0]['title'] +'</a></li>');
									$count ++;
								}
							});   
							
							var kw = getUrlVars()["kw"]; 
							if (typeof kw == 'undefined' || kw == "") {  
								$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
								$(".sugclose").show();
								$("#search_part .search-autosuggest").show();
							}
							
							// Other suggestions 
							if ($(".suggestions").length > 0) {
								var sugList = Array();
								$(".suggestions").empty();
								if (suggestions.length > 0) {
									i = 0;
									$.each(suggestions, function(i, val){ 
										if (i < 10) {
											if ($.inArray(val.toLowerCase(), sugList) < 0) {
												sugList.push(val);
												i ++;
											}
										} 
									}); 
								} else {
									i = 0;
									$.each(data.items, function() {
										$item = $(this);
										if (i < 10) {
											if ($.inArray($item[0]['title'].toLowerCase(), sugList) < 0) { 
												sugList.push($item[0]['title']);
												i ++;
											}
										} 
									});
								}
							
								$.each(sugList, function(i, val) { 
									$(".suggestions").append($('<li>').append($('<a>').html(val).bind("click")));
								});
							}
							
							//Results
							if ($(".search-result").length > 0) {
								$(".search-result").empty();   
								
								var jStr = []; 
								//$.ajax({url:'http://localhost:81/rta/v2/en/data/idos2', type:'GET', async:true, success: function(jData) {
								$.ajax({url: host + '/wps/PA_IDOS/getServicesNamesServlet?methodName=getServicesNamesWithIDs&lang=ar', type:'GET', async:true, crossDomain: true, success: function(jData) {
									var regex = /\\/g;
									//jData = jData.replace(regex, "\\");
									//console.log(jData);
									jsonData = JSON.parse(jData);
									
									for(var i in jsonData) {   
										var regex = new RegExp($kw.trim(), "gi"); 
										
										var value = jsonData[i].value;
										var label = jsonData[i].label;
										if (label != "")
											label = label.replace(regex, '<b>$&</b>');
										var description = jsonData[i].description + '';
										if (description != "")
											description = description.replace(regex, '<b>$&</b>');
										var regex = new RegExp($kw.trim().toLowerCase(), "gi"); 
										if (label.toLowerCase().match(regex)){
											if (value.trim() != "") {
												var item1 = {};
												item1["value"] = value;
												item1["label"] = label;
												item1["desription"] = description;
												jStr.push(item1);
											}
										}
									} 
									var idosDesription = "";
									for (var k = 0; k < jStr.length; k ++) {
										tags = "";
										$.each(suggestionKW2, function(i, val){
											var regex = new RegExp(val.toLowerCase(), "gi");
											if (jStr[k].desription.toLowerCase().match(regex) || jStr[k].label.toLowerCase().match(regex))  { 
												if (tags != "")
													tags += ", ";
												tags += val; 
											}
										});
										idosDesription = '\u0647\u064a\u0626\u0629 \u0627\u0644\u0637\u0631\u0642 \u0648 \u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0627\u062a \u002d \u062f\u0644\u064a\u0644 \u0627\u0644\u062e\u062f\u0645\u0627\u062a : ' + jStr[k].label.trim();																				
										$(".search-result").prepend('<li class="more-visible" data-show="1" data-tag="' + tags + '">' + '<span><a href="/wps/portal/rta/ae/home/rta-services/service-details?serviceId=' + jStr[k].value.trim() + '" class="tlink" target="_blank">' + jStr[k].label.trim() + '</a><br>' + idosDesription + '</span><a href="/wps/portal/rta/ae/home/rta-services/service-details?serviceId=' + jStr[k].value.trim() + '" target="_blank">www.rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=' + jStr[k].value.trim() + '</a></li>');
										$count ++;
									} 
								 
									$.each(data.items, function() {
										$item = $(this); 
										var img = ""; 
										try {
											if ($item[0]['pagemap']['cse_image'][0]['src'] != null)
												img = $item[0]['pagemap']['cse_image'][0]['src'];
										} catch(e1) {}
										if (img != "") {
											var ext = img.substring(img.lastIndexOf('.') + 1); 
											if ($.inArray(ext, extAllowed) < 0) 
												img = "";
										}
										tags = "";
										$.each(suggestionKW2, function(i, val){
											var regex = new RegExp(val.toLowerCase(), "gi");
											if ($item[0]['snippet'].toLowerCase().match(regex) || $item[0]['title'].toLowerCase().match(regex))  { 
												if (tags != "")
													tags += ", ";
												tags += val; 
											}
										}); 
										
										if (img != "")
											img = '<a href="' + $item[0]['link'] + '" target="_blank"><img src="' + img + '" width="100" /></a> ';
										if (tags != "")
											tags += ', ';
										tags += $item[0]['title'];
										
										var add = true;
										for (var k = 0; k < jStr.length; k ++) {
											//console.log($item[0]['htmlTitle'].trim() + jStr[k].label.trim() + add);
											var tUrl = "/wps/portal/rta/ae/home/rta-services/service-details?serviceId=" + jStr[k].value.trim();
											if (jStr[k].label.trim() == $item[0]['htmlTitle'].trim() || $item[0]['link'].trim() == tUrl) {
												add = false;
												break;
											}										
										} 
										
										
										if (add == true) {
											if ($kw.length <= 2) {
												var regex = new RegExp($kw.toLowerCase(), "gi");
												if ( $item[0]['title'].toLowerCase().match(regex)) { 
													$(".search-result").append('<li class="more-visible" data-show="1" data-tag="' + tags + '">' + img + '<span><a href="' + $item[0]['link'] + '" class="tlink" target="_blank">' + $item[0]['htmlTitle'] + '</a><br>' + $item[0]['htmlSnippet'] + '</span><a href="' + $item[0]['link'] + '" target="_blank">' + $item[0]['formattedUrl'] + '</a></li>');
												}
											} else {
												$(".search-result").append('<li class="more-visible" data-show="1" data-tag="' + tags + '">' + img + '<span><a href="' + $item[0]['link'] + '" class="tlink" target="_blank">' + $item[0]['htmlTitle'] + '</a><br>' + $item[0]['htmlSnippet'] + '</span><a href="' + $item[0]['link'] + '" target="_blank">' + $item[0]['formattedUrl'] + '</a></li>');
											}  
										}
									});  
								}});
								//$count = $count + jStr.length;
								
								
								$("#searchTags").html("<b>" + $kw + "</b>" + " " + $count + " \u0646\u062a\u0627\u0626\u062c");
								
								
								$('.more-visible').slice(permore).hide(); 
								if ($count > 1)
									$("#searchTags").html("<b>" + decodeURIComponent($kw) + "</b>" + " " + $count + " \u0646\u062a\u0627\u0626\u062c");
								else
									$("#searchTags").html("<b>" + decodeURIComponent($kw) + "</b>" + " " + $count + " \u0646\u062a\u064a\u062c\u0629");
								if ($count > permore)
									$more.show();
								$("#searchResults").show();
								$("#searchResultsLoader").hide();
							} 
							
						} else {
							$("#search_part .search-autosuggest ul").empty();
							$("#search_part .search-autosuggest ul").append('<li>\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c</li>');
							$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
							$("#searchResultsNone").show();
							$("#searchResults").hide();
							$("#searchResultsLoader").hide();
						}
					} else {
						$("#search_part .search-autosuggest ul").empty();
						$("#search_part .search-autosuggest ul").append('<li>\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c</li>');
						$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:10px;");
						$("#searchResultsNone").show();
						$("#searchResults").hide();
						$("#searchResultsLoader").hide(); 
					}
					  
				}
			});
		} else {
			$("#search_part .search-autosuggest ul").empty();
			$("#search_part .search-autosuggest ul").attr("style", "padding-bottom:0px;");   
		}
		if ($('.load-more-search').length > 0)
			$('.load-more-search').attr('data-load', "true");
	}
	
	$(".suggestions").on("click", "a", function() { 
		$me = $(this); 
		var vis = $('.load-more-search').attr('data-id');
		$(".search-msg").html("");
		if ($me.hasClass("active")) {
			var html = $('.search-result').html(); 
			$('.search-result').html(function(i,h){ return h.replace(/<b>/g,'').replace(/<\/b>/g,''); });  
			$me.removeClass("active");
		}
		else {
			$me.addClass("active"); 
		}
		$kw = "";  
		$(".search-result li").hide(); 
		$resultsvis = 0;
		$(".suggestions li a").each(function(index, element) {
			$c = $(this);
			if ($c.hasClass("active")) {
				$(".search-result span").each(function(index, element) {
					$t = $(this);
					var html = $t.html(); 
					var regex = new RegExp($c.html(), "gi");
					$t.html(html.replace(regex, '<b>$&</b>')); 
				});
				if ($kw != "")
					$kw += ", ";
				$kw += $c.html(); 
				$(".search-result li").each(function(index, element) {
					$t = $(this); 
					var regex = new RegExp($c.html(), "gi");
					var _tags = $t.attr('data-tag'); 
					if (_tags.match(regex)) {
						$t.show();  
						$resultsvis ++;
					}
				});
			}
			$(".suggestions-all a").removeClass("active");
		}); 
		$more.hide();		
		var $count = $('.search-result > li:visible').length;
		if ($count > 1)
			$("#searchTags").html("<b>" + $kw + "</b>" + " " + $count + " \u0646\u062a\u0627\u0626\u062c");
		else
			$("#searchTags").html("<b>" + $kw + "</b>" + " " + $count + " \u0646\u062a\u064a\u062c\u0629"); 

		if ($count <= 0)
			$(".search-msg").html ("\u0646\u0623\u0633\u0641\u0021 \u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c.");
		else
			$(".search-msg").html(""); 
		$('.load-more-search').attr('data-load', "false"); 
		if ($(".suggestions li a.active").length <= 0)
			$(".suggestions-all a").trigger("click"); 
	});
	
	$(".suggestions-all a").click(function() {
		var vis = $('.load-more-search').attr('data-id');
		$me = $(this);
		$me.addClass("active");
		$(".search-result li").show();
		$(".suggestions li a").each(function(index, element) {
			$(this).removeClass("active");
		});
		console.log(vis);
		$(".search-result li").slice(vis).hide();
		$more.show();
		if ($(".search-result li:hidden").length == 0)
			$more.hide();		
		var $count = $('.search-result > li').length;
		if ($count > 1)
			$("#searchTags").html("<b>" + $("#searchKW").val() + "</b>" + " " + $count + " \u0646\u062a\u0627\u0626\u062c");
		else
			$("#searchTags").html("<b>" + $("#searchKW").val() + "</b>" + " " + $count + " \u0646\u062a\u064a\u062c\u0629"); 
		 
		if ($count <= 0)
			$(".search-msg").html ("\u0646\u0623\u0633\u0641\u0021 \u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c.");
		else
			$(".search-msg").html("");
		
		$('.load-more-search').attr('data-load', "true");
	}); 
	 
});